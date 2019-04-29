const controller = require("app/http/controllers/api/controller");
const Course = require("app/models/course");
const Episode = require("app/models/episode");
const Comment = require("app/models/comment");
const passport = require("passport");

class courseController extends controller {
	async courses(req, res, next) {
		try {
			const page = req.query.page || 1;
			const promises = [];
			promises.push(
				Course.paginate(
					{},
					{
						page,
						sort: {
							createdAt: 1
						},
						limit: 12,
						populate: [{ path: "categories" }, { path: "user" }, { path: 'episodesCount' }],
					}
				)
			);
			promises.push(Episode.find({}, "time").exec());
			const results = await Promise.all(promises);
			const courses = results[0];
			const episodes = results[1];
			let seconds = 0;
			for (const episode of episodes) {
				const time = episode.time.split(":", 3);
				for (let x = 0; x < time.length; x++) {
					seconds += parseInt(time[x]) * Math.pow(60, time.length - x - 1);
				}
			}
			const data = {
				...courses,
				docs: courses.docs.map(this.filterCourse),
				episodes: episodes.length,
				seconds
			};
			res.json(data);
		} catch (err) {
			this.failed(err.message, res);
		}
	}

	filterCourse(course) {
		return {
			id: course.id,
			title: course.title,
			slug: course.slug,
			body: course.body,
			thumb: course.thumb,
			type: course.type,
			categories: course.categories.map(cate => {
				return {
					name: cate.name,
					slug: cate.slug
				};
			}),
			user: {
				id: course.user.id,
				name: course.user.name
			},
			price: course.price,
			createdAt: course.createdAt,
			time: course.time,
			episodes: course.episodesCount,
		};
	}

	async singleCourse(req, res) {
		try {
			const course = await Course.findOneAndUpdate({ slug: req.params.slug }, {
				$inc: { viewCount: 1 }
			}).populate([
				{
					path: "user",
					select: "name"
				},
				{
					path: "episodes",
					options: { sort: { number: 1 } }
				},
				{
					path: "categories",
					select: "name slug"
				},
				{
					path: "usersCount",
				}
			]);

			if (!course) return this.failed("چنین دوره ای یافت نشد", res, 404);
			passport.authenticate("jwt", { session: true }, (err, user, info) => {
				res.json({
					data: {
						course: this.filterCourseData(course, user),
						enrolled: user ? user.checkLearning() : false,
						enrolledCount: course.usersCount,
					},
					status: "success"
				});
			})(req, res);
		} catch (err) {
			this.failed(err.message, res);
		}
	}

	filterCourseData(course, user) {
		return {
			id: course.id,
			title: course.title,
			slug: course.slug,
			body: course.body,
			image: course.thumb,
			type: course.type,
			time: course.time,
			categories: course.categories.map(cate => {
				return {
					name: cate.name,
					slug: cate.slug
				};
			}),
			user: {
				id: course.user.id,
				name: course.user.name
			},
			episodes: course.episodes.map(episode => {
				return {
					time: episode.time,
					downloadCount: episode.downloadCount,
					viewCount: episode.viewCount,
					commentCount: episode.commentCount,
					id: episode.id,
					title: episode.title,
					body: episode.body,
					type: episode.type,
					number: episode.number,
					createdAt: episode.createdAt,
					download: episode.download(!!user, user)
				};
			}),
			price: course.price,
			createdAt: course.createdAt
		};
	}

	async commentForSingleCourse(req, res) {
		try {
			let comments = await Comment.find({
				course: req.params.course,
				parent: null,
				approved: true
			}).populate([
				{
					path: "user",
					select: "name"
				},
				{
					path: "comments",
					match: {
						approved: true
					},
					populate: { path: "user", select: "name" }
				}
			]);
			return res.json(comments);
		} catch (err) {
			this.failed(err.message, res);
		}
	}
}

module.exports = new courseController();
