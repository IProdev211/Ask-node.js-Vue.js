const controller = require('app/http/controllers/controller');
const Ticket = require('app/models/ticket');
const Role = require('app/models/role');

class ticketController extends controller {
  async index(req, res) {
    try {
      let page = req.query.page || 1;
      let users = await User.paginate(
        {},
        { page, sort: { createdAt: 1 }, limit: 20 }
      );

      res.render('admin/users/index', { title: 'کاربران سایت', users });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ticketController();
