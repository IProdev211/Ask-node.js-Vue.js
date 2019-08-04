const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const OPEN = 1;
const INPROGRESS = 2;
const ANSWERED = 3;
const ONHOLD = 4;
const CLOSED = 5;

const ticketSchema = Schema(
  {
    ticket_id: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    answerAt: { type: Date, default: Date.now() },
    department: { type: String, required: true },
    priority: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: Number, default: OPEN },
    files: { type: [String], default: null },
    isHighlight: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

ticketSchema.plugin(mongoosePaginate);
ticketSchema.plugin(autoIncrement.plugin, {
  model: "Ticket",
  field: 'ticket_id',
  startAt: 1,
  incrementBy: 1,
});

/* ticketSchema.pre('save', async function(next) {
  if (! this.ticket_id) {
    const count = await this.constructor.countDocuments();
    this.ticket_id = (count || 0) + 1;
  }
  next();
}); */



module.exports = mongoose.model('Ticket', ticketSchema);
