const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const logSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    type: { type: String, required: true },
    ip: { type: String, default: null }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

logSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Log', logSchema);
