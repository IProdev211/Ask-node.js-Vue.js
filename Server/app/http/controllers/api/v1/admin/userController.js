const controller = require("app/http/controllers/api/controller");
const User = require('app/models/user');
const Payment = require('app/models/payment');
const fs = require('fs');

class userController extends controller {
	async index(req , res) {
		const page = req.query.page || 1;
		const limit = req.query.limit || 25;
		let filter = {};
		if (req.query.filter) {
			filter = {
				$or: [
					{ name: { $regex: req.query.filter, $options: 'i' } },
					{ email: { $regex: req.query.filter, $options: 'i' } }
				],
			}
		}
		const users = await User.paginate(filter , {
			page ,
			sort : { createdAt : 1 } ,
			limit : parseInt(limit, 10) ,
		});
		const docs = [];
		const userIds = [];
		const userPayments = {};
		for (const user of users.docs) {
			userIds.push(user.id);
			userPayments[user.id] = {
				sum: 0,
				courses: [],
			};
		}
		const payments = await Payment.find({ user: { $in: userIds }, payment: true }).populate("course");
		for (const payment of payments) {
			userPayments[payment.user].sum += payment.price;
			if (!payment.course) continue;
			userPayments[payment.user].courses.push({
				id: payment.course.id,
				title: payment.course.title,
				signupDate: payment.updatedAt,
			});
		}
		for (const user of users.docs) {
			docs.push(this.filterUserData(user, userPayments[user.id]));
		}
		res.json({
			...users,
			docs: docs,
		});
	}
	filterUserData(user, payments) {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			vipTime: user.vipTime,
			vipFrom: user.vipFrom,
			createdAt: user.createdAt,
			amountspent: payments.sum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
			learning: payments.courses,
			xp: user.xp || 0,
		}
	}
	async store(req , res) {
		if (! await this.validationData(req, res)) return;
		let avatar = "";
		if (req.file) {
			avatar = this.getUrlImage(`${req.file.destination}/${req.file.filename}`);
		}
		let { name , email , password, xp } = req.body;

		let newUser = new User({ 
			name: name,
			email: email,
			password: password,
			xp: xp || 0,
			avatar: avatar || null,
		});

		await newUser.save();
		return res.json({
			data: {
				user: this.filterUserData(newUser, {
					sum: 0,
					courses: [],
				}),
			},
			status: "success"
		});
	}
	async update(req, res , next) {
		if (! await this.validationData(req, res)) return;
		const objForUpdate = {};
		if (req.file) {
			objForUpdate.avatar = this.getUrlImage(`${req.file.destination}/${req.file.filename}`);
		}
		delete req.body.file;		
		const user = await User.findByIdAndUpdate(req.params.id, {
			$set: { ...req.body,
				...objForUpdate
			}
		}, {
			new: true,
		});
		const userPayments = {
			sum: 0,
			courses: [],
		};
		const payments = await Payment.find({ user: user.id, payment: true }).populate("course");
		for (const payment of payments) {
			userPayments.sum += payment.price;
			if (!payment.course) continue;
			userPayments.courses.push({
				id: payment.course.id,
				title: payment.course.title,
				signupDate: payment.updatedAt,
			});
		}
		return res.json({
			data: {
				user: this.filterUserData(user, userPayments),
			},
			status: "success"
		});
	}
	async destroy(req, res, next) {
		this.isMongoId(res, req.params.id);
		let user = await User.findById(req.params.id).exec();
		if (!user) {
			this.failed('چنین کاربری وجود ندارد', res, 404);
			return;
		}
		if (user.avatar) {
			// delete avatar
			fs.unlinkSync(`./public${user.avatar}`)
		}
		// delete user
		user.remove();
		return res.json({
			status: "success"
		});
    }
	getUrlImage(dir) {
				return dir.substring(8);
	}
}

module.exports = new userController();