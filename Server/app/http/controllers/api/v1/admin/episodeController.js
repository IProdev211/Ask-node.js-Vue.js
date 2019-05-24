const controller = require("app/http/controllers/api/controller");
const Episode = require('app/models/episode');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

class episodeController extends controller {
	async index(req, res) {
		try {
			const page = req.query.page || 1;
			const limit = req.query.limit || 15;
			const episodes = await Episode.paginate({},
				{
					page,
					sort: {
						course: 1,
						number: 1,
					},
					limit: parseInt(limit, 10),
					populate: 'course',
				}
			);
			const data = {
				...episodes,
				docs: episodes.docs.map(this.filterEpisodeData),
			};
			res.json(data);
		} catch (err) {
			this.failed(err.message, res);
		}
	}

	filterEpisodeData(episode) {
		return {
			id: episode.id,
			title: episode.title,
			number: episode.number,
			time: episode.time,
			viewCount: episode.viewCount,
			videoUrl: episode.videoUrl,
			course: {
				id: episode.course.id,
				title: episode.course.title
			},
			courseName: episode.course.title,
			type: episode.type,
			body: episode.body,
			createdAt: episode.createdAt,
			xp: episode.xp ? episode.xp : 0,
		};
	}

	async store(req, res, next) {
		if (! await this.validationData(req, res)) return;

		let {
			title,
			body,
			type,
			time,
			videoUrl,
			course,
			number,
			xp,
		} = req.body;
		number = Math.min(await this.getLastNumber(course), number); 
		let newEpisode = new Episode({
			title,
			body,
			type,
			time,
			videoUrl,
			course,
			number,
			xp,
		});

		await newEpisode.save();
		await Episode.updateMany({
			$and: [
				{ _id: { $ne: newEpisode.id } },
				{ course: newEpisode.course },
				{ number: { $gte: newEpisode.number } },
			],
		}, {
			$inc: { number: +1 },
		});
		return res.json({
			data: {
				episode: this.filterEpisodeData(newEpisode),
			},
			status: "success"
		});
	}
	async update(req, res, next) {
		if (! await this.validationData(req, res)) return;
		const episode = await Episode.findById(req.params.episode).exec();
		if (! episode) {
			this.failed('چنین دوره ای وجود ندارد', res, 404);
			return;
		}
		const newData = {};
		let number = req.body.number;
		newData.number = Math.min(await this.getLastNumber(req.body.course), number);
		delete req.body.number;
		const newEpisode = await Episode.findByIdAndUpdate(req.params.episode, {
			$set: { ...req.body, ...newData }
		}, {
			new: true,
		});
		if (episode.number != newEpisode.number) {
			if (newEpisode.number > episode.number) {
				await Episode.updateMany({
					$and: [
						{ _id: { $ne: newEpisode.id } },
						{ course: newEpisode.course },
						{
							$and: [
								{ number: { $lte: newEpisode.number } },
								{ number: { $gt: episode.number } },
							],
						},
					],
				}, {
					$inc: { number: -1 },
				});
			} else {
				await Episode.updateMany({
					$and: [
						{ _id: { $ne: newEpisode.id } },
						{ course: newEpisode.course },
						{
							$and: [
								{ number: { $gte: newEpisode.number } },
								{ number: { $lt: episode.number } },
							],
						},
					],
				}, {
					$inc: { number: 1 },
				});
			}
		}
		return res.json({
			data: {
				episode: this.filterEpisodeData(newEpisode),
			},
			status: "success"
		});
	}
	async destroy(req, res) {
		this.isMongoId(res, req.params.episode);

		const episode = await Episode.findById(req.params.episode).exec();
		if (! episode) {
			this.failed('چنین دوره ای وجود ندارد', res, 404);
			return;
		}
		await Episode.updateMany({
			$and: [
				{ course: episode.course },
				{ number: { $gt: episode.number } },
			],
		}, {
			$inc: { number: -1 },
		});
		episode.remove();
		return res.json({
			status: "success"
		});
	}
	async getLastNumber(course) {
		const episode = await Episode.findOne({ course: course }, 'number').sort({ "number": -1 });
		let number = 1;
		if (episode) {
			number = episode.number + 1;
		}
		return number;
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

module.exports = new episodeController();