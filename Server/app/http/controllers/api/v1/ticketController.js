const controller = require('app/http/controllers/api/controller');
const Ticket = require('app/models/ticket');
const ticketMessage = require('app/models/ticketmessage');
const path = require("path");

class ticketController extends controller {
  async search(req, res, next) {
    try {
      const page = req.query.page || 1;
      const condition = {};
      if (! req.user.admin) {
        condition.user = req.user.id;
      }
      const tickets = await Ticket.paginate(
        condition,
        {
          page,
          sort: {
            answerAt: -1
          },
          limit: 4,
          populate: [
            { path: 'user' },
          ]
        }
      );
      res.json({
        ...tickets,
        docs: tickets.docs.map(this.filterTicket),
      });
    } catch (err) {
      this.failed(err.message, res);
    }
  }

  filterTicket(ticket) {
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
  filterMessage(message) {
    const files = [];
    message.files.map(file => {
      if (! file) {
        return;
      }
      const name = file.split("/").pop();
      files.push({
        name: name,
        downloadUrl: `/tickets/view/${message.id}/${name}`
      });
    });
    return {
      id: message.id,
      user: {
        id: message.user.id,
        name: message.user.name,
        isAdmin: message.user.admin,
      },
      message: message.message,
      createdAt: message.createdAt,
      files: files,
    };
  }

  async singleTicket(req, res) {
    try {
      const condition = {
        _id: req.params.ticket
      };
      if (! req.user.admin) {
        condition.user = req.user.id;
      }
      const ticket = await Ticket.findOne(condition).populate("user").exec();
      if (! ticket) return this.failed('چنین تیکتی یافت نشد', res, 404);

      const messages = await ticketMessage.find({
        ticket: ticket.id,
      }).populate("user").sort({
        createdAt: 1
      }).exec();
      res.json({
        ticket: await this.filterTicket(ticket),
        messages: messages.map(message => {
          return this.filterMessage(message);
        }),
        status: 'success'
      });
    } catch (err) {
      this.failed(err.message, res);
    }
  }

  async store(req, res) {
    if (!(await this.validationData(req, res))) return;
    let file;
    if (req.file) {
      file = this.getUrlFile(`${req.file.destination}/${req.file.filename}`);
    }
    let { title, message, priority, department } = req.body;
    
    const ticket = await new Ticket({
      title,
      user: req.user.id,
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

    ticket.user = req.user;

    res.json({
      ticket: this.filterTicketData(ticket),
      status: 'success'
    });
  }

  async reply(req, res) {

    const ticket = await Ticket.findById(req.body.ticket).populate("user");
    if (! ticket) return this.failed('چنین تیکتی یافت نشد', res, 404);

    let file;
    if (req.file) {
      file = this.getUrlFile(`${req.file.destination}/${req.file.filename}`);
      delete req.file;
    }
    const ticketmessage = await new ticketMessage({
      message: req.body.message,
      ticket: ticket.id,
      user: req.user.id,
      files: [file],
    });
    await ticketmessage.save();

    const update = {
      answerAt: Date.now(),
    }
    if (ticket.user.id == req.user.id) {
      update.status = 1;
    } else {
      update.status = 2;
    }

    await Ticket.findByIdAndUpdate(req.body.ticket, {
      $set: update,
    }).exec();

    ticketmessage.user = req.user;

    res.json({
      ticket: this.filterTicket(ticket),
      message: this.filterMessage(ticketmessage),
      status: 'success'
    });
  }
  
  async downloadFile(req, res) {
    const message = await ticketMessage.findById(req.params.message).populate({
      path: "ticket",
      populate: {
        path: "user",
      },
    });
    if (! req.user.admin && message.ticket.user.id != req.user.id) {
      return this.failed('چنین تیکتی یافت نشد', res, 404);
    }
    let file;
    for (const item of message.files) {
      if (item) {
        if (item.search(req.params.filename) >= 0) {
          file = item;
          break;
        }
      }
    }
    if (! file) {
      return this.failed('چنین فایلی یافت نشد', res, 404);
    }
    const publicPath = path.resolve(__dirname, "..", "..", "..", "..", "..", "public");
    return res.download(path.join(publicPath, file));
  }
  getUrlFile(dir) {
    return dir.substring(8);
  }
}

module.exports = new ticketController();
