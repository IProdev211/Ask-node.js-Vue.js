const controller = require("app/http/controllers/api/controller");
const HomeController = require("app/http/controllers/api/v1/homeController");
const Episode = require("app/models/episode");
const Payment = require("app/models/payment");
const path = require("path");
const sharp = require("sharp");
const Log = require("app/models/log");

class dashboardController extends controller {
	async index(req, res) {
		let page = req.query.page || 1;
		const promises = [
			Episode.count().exec(),
			Episode.count({ _id: { $in: req.user.learning } }).exec(),
			Payment.paginate(
				{ user: req.user.id },
				{
					page: page,
					sort: { createdAt: -1 },
					limit: 20,
					populate: {
						path: "course",
						select: "_id title images thumb price vip"
					},
					select: "_id createdAt price payment course"
				}
			)
		];

		const results = await Promise.all(promises);
		const response = {
			status: true,
			courses: req.user.learning.length,
			episodes: [results[1], results[0]],
			payments: {
				...results[2]
			}
		};
		res.json(response);
	}
	async updateProfile(req, res) {
		if (!(await this.validationData(req, res))) return;
		let avatar;
		if (req.file) {
			avatar = this.imageResize(req.file, 250);
		}
		const user = await req.user
			.populate({
				path: "roles",
				select: "name label permissions",
				populate: [{ path: "permissions" }]
			})
			.populate({
				path: "roles",
				select: "name label permissions",
				populate: [{ path: "permissions" }]
			})
			.execPopulate();

		user.name = req.body.name;
		user.email = req.body.email;
		user.lang = req.body.lang;
		if (avatar) {
			user.avatar = avatar;
		}

		try {
			await user.save();
			res.json({
				status: true,
				user: HomeController.filterUserData(user)
			});
		} catch (err) {
			this.failed(err.message, res);
		}
	}
	async logs(req, res) {
		const page = req.query.page || 1;
		const limit = req.query.limit || 2;
		const logs = await Log.paginate({},
			{
				page,
				sort: {
					createdAt: -1
				},
				limit: parseInt(limit, 10),
				populate: [ { path: 'user' } ],
			}
		);
		const data = {
			...logs,
			docs: logs.docs.map(this.filterLogData),
		};
		res.json(data);
	}
	filterLogData(log) {
		return {
			id: log.id,
			title: log.title,
			ip: log.ip,
			type: log.type,
			createdAt: log.createdAt,
			user: {
				id: log.user.id,
				name: log.user.name,
			},
		};
	}
	imageResize(image, size) {
		const imageInfo = path.parse(image.path);
		const imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;

		const url = this.getUrlImage(`${image.destination}/${imageName}`);

		sharp(image.path)
			.resize(size, null)
			.toFile(`${image.destination}/${imageName}`);
		return url;
	}

	getUrlImage(dir) {
		return dir.substring(8);
	}
}

module.exports = new dashboardController();
