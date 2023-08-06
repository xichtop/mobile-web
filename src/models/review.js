const mongoose = require('mongoose');
const Product = require('./product');

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
    default: Date.now
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

reviewSchema.statics.calcAverageRatings = async function(productId) {
  const stats = await this.aggregate([
    {
      $match: {product: productId}
    },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating'}
      }
    }
  ]);
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingQuantity: stats[0].nRating,
      ratingAverage: stats[0].avgRating
    })
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingQuantity: 0,
      ratingAverage: 5
    })
  }
  
}

reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.product);
})

// run before the query
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.clone().findOne(); // Clone the query to use constructor in post middleware
  next();
})

// run after the query
reviewSchema.post(/^findOneAnd/, async function(){
  await this.r.constructor.calcAverageRatings(this.r.product);
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;