const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, sequelize, Reviewimage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Add an Image to a Review based on the Review's id
router.post(
  '/:id/images',
  async (req, res, next) => {
    const reviewId = +req.params.id;
    const { url } = req.body;
    const userId = +req.user.id;

    const review = await Review.findByPk(reviewId);

    if (!review) {
      const err = new Error("Review couldn't be found");
      err.status = 404;
      next(err);
    }

    if (userId !== review.userId) {
      const err = new Error("Need to be owner of the review to add images");
      err.status = 403;
      return next(err);
    }

    const has10Images = await Reviewimage.findAll({
      where: {
        reviewId
      }
    });

    if (has10Images.length > 10) {
      const err = new Error("Maximum number of images for this resource was reached");
      err.status = 403;
      return next(err);
    }

    const newReviewImage = await Reviewimage.create(
      {
        reviewId,
        spotId: review.spotId,
        url
      }
    );

    res.status(200)
    res.json({
      id: newReviewImage.id,
      url: newReviewImage.url
    })
  })


// Error formatter
router.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    //title: err.title || 'Server Error',
    message: err.message,
    statusCode: err.status,
    //errors: [err.errors]
    //stack: isProduction ? null : err.stack
  });
});

module.exports = router;
