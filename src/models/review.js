const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  message: String,
  rating: {
    type: Number,
    required: [true, "Rating can not be empty"],
    min: 1,
    max: 5
  },
  introduceFriend: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must be long to an user."]
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Review must be long to a product."]
  }
}, 
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "name photo"
  });
  next();
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;