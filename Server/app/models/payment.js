const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const paymentSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    default: null
  },
  vip: {
    type: Boolean,
    default: false
  },
  resnumber: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  payment: {
    type: Boolean,
    default: false
  },
  vipMonth: {
    type: Number,
    default: null
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

paymentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Payment', paymentSchema);