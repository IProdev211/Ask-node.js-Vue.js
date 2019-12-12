const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const blogPostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'blogTag'
  }],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'blogCategory'
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

blogPostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('blogPost', blogPostSchema);