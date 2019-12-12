const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogCategorySchema = Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'blogCategory',
    default: null
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

blogCategorySchema.virtual('childs', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

module.exports = mongoose.model('blogCategory', blogCategorySchema);