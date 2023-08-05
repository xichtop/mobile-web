const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  sortCode: {
    type: 'String',
    required: [true, 'Category must have a short code!'],
    unique: [true, 'Shortcode must be unique!']
  },
  description: {
    type: 'String',
    required: [true, 'Category must have a description!'],
  }
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;