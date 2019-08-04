const controller = require('app/http/controllers/api/controller');
const User = require('app/models/user');
const Ticket = require('app/models/ticket');
const ticketMessage = require('app/models/ticketmessage');

class ticketController extends controller {
  async search(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;
    let filter = {};
    if (req.query.filter) {
      filter = {
        $or: [
          { title: { $regex: req.query.filter, $options: 'i' } },
          { department: { $regex: req.query.filter, $options: 'i' } },
        ]
      };
      const users = await User.find({
        $or: [
          { name: { $regex: req.query.filter, $options: 'i' } },
          { email: { $regex: req.query.filter, $options: 'i' } }
        ]
      }, "_id").exec();
      if (users.length) {
        filter.$or.push({
          user: {$in: users.map(user => {return user.id})},
        });
      }
    }
    const promises = [
      Ticket.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ]).exec(),
      Ticket.paginate(filter, {
        page,
        sort: { answerAt: -1 },
        limit: parseInt(limit, 10),
        populate: "user",
      }),
    ];
    const result  = await Promise.all(promises);
    const tickets = result[1]; 
    const docs = tickets.docs.map(this.filterTicketData);
    res.json({
      ...tickets,
      docs: docs,
      tickets: result[0].map(item => {
        return {
          status: item._id,
          count: item.count,
        };
      }),
    });
  }
  filterTicketData(ticket) {
    if (! ticket.user) {
      return;
    }
    return {
      id: ticket.id,
      ticket_id: ticket.ticket_id,
      title: ticket.title,
      user: {
        id: ticket.user.id,
        name: ticket.user.name,
      },
      department: ticket.department,
      priority: ticket.priority,
      date: ticket.createdAt,
      isHighlight: ticket.isHighlight,
      answerAt: ticket.answerAt,
      status: ticket.status,
    };
  }
  async highlight(req, res) {
    res.json({
      status: "success"
    });
  }
  async store(req, res) {
    if (!(await this.validationData(req, res))) return;
    let file;
    if (req.file) {
      file = this.getUrlFile(`${req.file.destination}/${req.file.filename}`);
    }
    let { title, user, message, priority, department } = req.body;
    
    const ticket = await new Ticket({
      title,
      user: user.id,
      priority,
      department,
      status: 1,
    });
    await ticket.save();

    const ticketmessage = await new ticketMessage({
      message,
      ticket: ticket.id,
      user: req.user.id,
      files: [file],
    });
    await ticketmessage.save();

    ticket.user = req.body.user;

    res.json({
      ticket: this.filterTicketData(ticket),
      status: 'success'
    });
  }
  async toggleHighLight(req, res) {
    this.isMongoId(res, req.params.ticket);
    const ticket = Ticket.findById(req.params.ticket);
    if (! ticket) {
      return this.failed('چنین تیکتی وجود ندارد', res, 404);
    }
    await Ticket.findByIdAndUpdate(req.params.ticket, {
      isHighlight: !ticket.isHighlight,
    });


    res.json({
      status: "success",
    });
  }
  async destroy(req, res) {
    this.isMongoId(res, req.params.ticket);
    await Ticket.findByIdAndDelete(req.params.ticket);
    await ticketMessage.deleteMany({
      ticket: req.params.ticket,
    });
    res.json({
      status: "success",
    });
  }

  async update(req, res) {
    if (!(await this.validationData(req, res))) return;
    let ticket = Ticket.findById(req.params.ticket);

    if (! ticket) {
      return this.failed('چنین تیکتی وجود ندارد.', res, 404);
    }
    ticket = await Ticket.findByIdAndUpdate(
      {_id: req.params.ticket},
      {
        $set: {... req.body}
      },
      {
        new: true,
      }
    );
    ticket.user = await User.findById(req.body.user);

    res.json({
      ticket: this.filterTicketData(ticket),
      status: 'success'
    });
  }

  async destroyMessage(req, res) {
    this.isMongoId(res, req.params.message);
    await ticketMessage.findByIdAndDelete(req.params.message);
    res.json({
      status: "success",
    });
  }

  async editMessage(req, res) {
    this.isMongoId(res, req.params.message);
    if (req.body.message) {
      await ticketMessage.findByIdAndUpdate(req.params.message, {
        $set: {
          message: req.body.message,
        }
      });
    }
    res.json({
      status: "success",
    });
  }
  getUrlFile(dir) {
    return dir.substring(8);
  }
}

module.exports = new ticketController();
