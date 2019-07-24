const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const crypto = require('crypto');
mongoose.set('useFindAndModify', false);

const episodeSchema = Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    title: { type: String, required: true },
    type: { type: String, required: true },
    body: { type: String, required: true },
    time: { type: String, default: '00:00:00' },
    number: { type: Number, required: true },
    videoUrl: { type: String, required: true },
    downloadCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    xp: { type: Number, default: 0 }
  },
  { timestamps: true }
);

episodeSchema.plugin(mongoosePaginate);

episodeSchema.methods.typeToPersian = function() {
  switch (this.type) {
    case 'paid':
      return 'نقدی';
      break;
    case 'vip':
      return 'اعضای ویژه';
      break;
    default:
      return 'رایگان';
      break;
  }
};

episodeSchema.methods.download = function(check, user) {
  const type = this.type.toLowerCase();
  if (type != 'free' && ! check) return '#';
  let status = false;
  if (type == 'free') {
    status = true;
  } else if (user && user.admin) {
    status = true;
  } else {
    if (type == 'vip') {
      status = user.isVip();
    } else if (type == 'paid') {
      status = user.checkLearning(this.course);
    }
  }
  if (! status) {
    return '#';
  }
  let timestamps = new Date().getTime() + 3600 * 1000 * 12;
  const text = `aQTR@!#Fa#%!@%SDQGGASDF${this.id}${timestamps}`;
  const hash = crypto
    .createHash('md5')
    .update(text)
    .digest('hex');
  return `/courses/episode/download/${this.id}?mac=${hash}&t=${timestamps}`;
};

episodeSchema.methods.validateDownload = function(mac, t) {
  const text = `aQTR@!#Fa#%!@%SDQGGASDF${this.id}${t}`;
  const hash = crypto
    .createHash('md5')
    .update(text)
    .digest('hex');
  return hash === mac;
};
episodeSchema.methods.path = function() {
  return `${this.course.path()}/${this.number}`;
};

episodeSchema.methods.inc = async function(field, num = 1) {
  this[field] += num;
  await this.save();
};

module.exports = mongoose.model('Episode', episodeSchema);
