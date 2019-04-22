const controller = require("app/http/controllers/api/controller");
const Course = require('app/models/course');

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
                	populate: [ { path: 'commentsCount'}, { path: 'usersCount' } ],
                }
            );
			const data = {
                ...courses,
                docs: courses.docs.map(this.filterIndexesCourse),
			};
			res.json(data);
		} catch (err) {
			this.failed(err.message, res);
		}
    }

    filterIndexesCourse(course) {
		return {
			id: course.id,
			title: course.title,
			type: course.type,
			comments: course.commentsCount,
			users: course.usersCount,
		};
	}
}

module.exports = new courseController();