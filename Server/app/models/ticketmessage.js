const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const READ = 1;
const UNREAD = 2;

const ticketMessageSchema = Schema({
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  },
  files: {
    type: [String],
    default: null
  },
  status: {
    type: Number,
    default: UNREAD
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});


module.exports = mongoose.model('ticketMessage', ticketMessageSchema);