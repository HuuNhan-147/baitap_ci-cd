const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  slug: {
    type: String,
    required: [true, 'Please add a slug'],
    unique: true
  },
  excerpt: {
    type: String,
    required: [true, 'Please add an excerpt']
  },
  content: {
    type: String,
    required: [true, 'Please add content'] // Markdown supported
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  tags: {
    type: [String],
    default: []
  },
  author: {
    type: String,
    required: [true, 'Please add an author']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  readTime: {
    type: String,
    required: [true, 'Please add a read time']
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
