const controller = require("app/http/controllers/api/controller");
const Course = require('app/models/course');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

class courseController extends controller {
	async index(req, res) {
		try {
			const page = req.query.page || 1;
			const limit = req.query.limit || 15;
			const courses = await Course.paginate({},
				{
					page,
					sort: {
						createdAt: 1
					},
					limit: parseInt(limit, 10),
					populate: [ { path: 'commentsCount'}, { path: 'usersCount' }, { path: 'Category' } ],
				}
			);
			const data = {
				...courses,
				docs: courses.docs.map(this.filterCourseData),
			};
			res.json(data);
		} catch (err) {
			this.failed(err.message, res);
		}
	}

	filterCourseData(course) {
		return {
			id: course.id,
			title: course.title,
			slug: course.slug,
			body: course.body,
			thumb: course.thumb,
			type: course.type,
			tags: course.tags.split(' '),
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
			comments: course.commentsCount ? course.commentsCount : 0,
			users: course.usersCount ? course.usersCount : 0,
			oldPrice: course.oldPrice ? course.oldPrice : 0,
			xp: course.xp ? course.xp : 0,
		};
	}

	async store(req, res, next) {
		if (! await this.validationData(req, res)) return;

		// create course
		let images = this.imageResize(req.file);
		let {
			title,
			body,
			type,
			price,
			tags,
			lang,
			xp,
			oldPrice,
		} = req.body;

		let newCourse = new Course({
			user: req.user._id,
			title,
			slug: this.slug(title),
			body,
			type,
			price,
			images,
			thumb: images[480],
			tags,
			lang,
			xp,
			oldPrice,
		});

		await newCourse.save();
		return res.json({
			data: {
				course: this.filterCourseData(newCourse),
			},
			status: "success"
		});
	}
	async update(req, res, next) {
		if (! await this.validationData(req, res)) return;
		let objForUpdate = {};

		// check image 
		if (req.file) {
			objForUpdate.images = this.imageResize(req.file);
			objForUpdate.thumb = objForUpdate.images[480];
		}

		delete req.body.images;
		objForUpdate.slug = this.slug(req.body.title);

		const newCourse = await Course.findByIdAndUpdate(req.params.id, {
			$set: { ...req.body,
				...objForUpdate
			}
		}, {
			new: true,
		});
		return res.json({
			data: {
				course: this.filterCourseData(newCourse),
			},
			status: "success"
		});
	}
	async destroy(req, res, next) {
		this.isMongoId(res, req.params.id);

		let course = await Course.findById(req.params.id).populate('episodes').exec();
		if (!course) {
			this.failed('چنین دوره ای وجود ندارد', res, 404);
			return;
		}

		// delete episodes
		course.episodes.forEach(episode => episode.remove());

		// delete Images
		Object.values(course.images).forEach(image => fs.unlinkSync(`./public${image}`));

		// delete courses
		course.remove();

		return res.json({
			status: "success"
		});
    }
	imageResize(image) {
        const imageInfo = path.parse(image.path);

        let addresImages = {};
        addresImages['original'] = this.getUrlImage(`${image.destination}/${image.filename}`);

        const resize = size => {
            let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;

            addresImages[size] = this.getUrlImage(`${image.destination}/${imageName}`);

            sharp(image.path)
                .resize(size, null)
                .toFile(`${image.destination}/${imageName}`);
        }

        [1080, 720, 480].map(resize);

        return addresImages;
	}
	getUrlImage(dir) {
        return dir.substring(8);
	}
	slug(title) {
		return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/gi, "-");
	}
}

module.exports = new courseController();