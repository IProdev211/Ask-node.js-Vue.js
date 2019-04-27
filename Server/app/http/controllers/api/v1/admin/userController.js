const controller = require("app/http/controllers/api/controller");
const User = require('app/models/user');
const Payment = require('app/models/payment');

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
		const users = await User.paginate(filter , { page , sort : { createdAt : 1 } , limit : parseInt(limit, 10) } )
		const docs = [];
		const userIds = [];
		for (const user of users.docs) {
			userIds.push(user.id);
		}
		const payments = await Payment.find({ user: { $in: userIds }, payment: true }).exec();
		const userPayments = {};
		for (const payment of payments) {
			if (userPayments[payment.user] === undefined) {
				userPayments[payment.user] = 0;
			}
			userPayments[payment.user] += payment.price;
		}
		for (const user of users.docs) {
			docs.push(this.filterUserData(user, userPayments[user.id]));
		}
		res.json({
			...users,
			docs: docs,
		});
	}
	filterUserData(user, sum = 0) {
		return {
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			vipTime: user.vipTime,
			amountspent: sum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
		}
	}
}

module.exports = new userController();