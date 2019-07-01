const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const crypto = require('crypto');

const courseSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    title: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: String, required: true },
    body: { type: String, required: true },
    price: { type: String, required: true },
    thumb: { type: String, required: true },
    videoUrl: { type: String, required: true },
    tags: { type: String, required: true },
    time: { type: String, default: '00:00:00' },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    lang: { type: String, default: 'en' },
    xp: { type: Number, default: 0 },
    oldPrice: { type: String, default: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

courseSchema.plugin(mongoosePaginate);

courseSchema.methods.typeToPersian = function() {
  switch (this.type) {
    case 'cash':
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

courseSchema.methods.path = function() {
  return `/courses/${this.slug}`;
};

courseSchema.methods.inc = async function(field, num = 1) {
  this[field] += num;
  await this.save();
};
courseSchema.methods.download = function(check, user) {
  const timestamps = new Date().getTime() + 3600 * 1000 * 12;
  const text = `aQTR@!#Fa#%!@%SDQGGASDF${this.id}${timestamps}`;
  const hash = crypto
    .createHash('md5')
    .update(text)
    .digest('hex');
  return `/courses/download/${this.id}?mac=${hash}&t=${timestamps}`;
};
courseSchema.methods.validateDownload = function(mac, t) {
  const text = `aQTR@!#Fa#%!@%SDQGGASDF${this.id}${t}`;
  const hash = crypto
    .createHash('md5')
    .update(text)
    .digest('hex');
  return hash === mac;
};
courseSchema.virtual('episodes', {
  ref: 'Episode',
  localField: '_id',
  foreignField: 'course'
});

courseSchema.virtual('episodesCount', {
  ref: 'Episode',
  localField: '_id',
  foreignField: 'course',
  count: true
});

courseSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'course'
});

courseSchema.virtual('commentsCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'course',
  count: true
});

courseSchema.virtual('usersCount', {
  ref: 'User',
  localField: '_id',
  foreignField: 'learning',
  count: true
});

module.exports = mongoose.model('Course', courseSchema);
