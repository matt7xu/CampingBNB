const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, sequelize, Reviewimage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// const validateBooking = [
//   check('review')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage("Review text is required"),
//   check('stars')
//     .exists({ checkFalsy: true })
//     .isDecimal()
//     .notEmpty()
//     .isIn([1, 2, 3, 4, 5])
//     .withMessage("Stars must be an integer from 1 to 5"),
//   handleValidationErrors
// ];

// //Add an Image to a Review based on the Review's id
// router.post(
//   '/:id/images',
//   requireAuth,
//   async (req, res, next) => {
//     const reviewId = +req.params.id;
//     const { url } = req.body;
//     const userId = +req.user.id;

//     const review = await Review.findByPk(reviewId);

//     if (!review) {
//       const err = new Error("Review couldn't be found");
//       err.status = 404;
//       next(err);
//     }

//     if (userId !== review.userId) {
//       const err = new Error("Need to be owner of the review to add images");
//       err.status = 403;
//       return next(err);
//     }

//     const has10Images = await Reviewimage.findAll({
//       where: {
//         reviewId
//       }
//     });

//     if (has10Images.length > 10) {
//       const err = new Error("Maximum number of images for this resource was reached");
//       err.status = 403;
//       return next(err);
//     }

//     const newReviewImage = await Reviewimage.create(
//       {
//         reviewId,
//         spotId: review.spotId,
//         url
//       }
//     );

//     res.status(200)
//     res.json({
//       id: newReviewImage.id,
//       url: newReviewImage.url
//     })
//   })

//Edit a Booking
router.put(
  '/:id',
  requireAuth,
  async (req, res, next) => {
    const bookingId = +req.params.id;
    const { startDate, endDate } = req.body;

    if (endDate <= startDate) {
      const err = new Error("Validation error");
      err.status = 400;
      err.errors = "endDate cannot be on or before startDate";
      next(err);
    }

    const updateBooking = await Booking.findByPk(bookingId);

    if (!updateBooking) {
      const err = new Error("Booking couldn't be found");
      err.message = "Booking couldn't be found";
      err.status = 404;
      return next(err);
    }

    if (updateBooking.userId !== req.user.id) {
      const err = new Error("Need to be owner of the booking to edit a booking");
      err.message = "Need to be owner of the booking to edit a booking";
      err.status = 403;
      return next(err);
    }

    const currentTime = new Date();
    if(updateBooking.dataValues.endDate <= currentTime) {
      const err = new Error("Past bookings can't be modified");
      err.message = "Past bookings can't be modified";
      err.status = 403;
      return next(err);
    }

    let sDate = new Date(startDate);
    let eDate = new Date(endDate);

    const currentBookingsStart = await Booking.findAll({
      where: {
        id: {
          [Op.not]: bookingId
        },
        spotId: updateBooking.spotId,
        endDate: {
          [Op.between]: [sDate, eDate]
        }
      }
    });

    if (currentBookingsStart.length > 0) {
      const err = new Error("Sorry, this spot is already booked for the specified dates");
      err.status = 403;
      err.errors = "Start date conflicts with an existing booking";
      next(err);
    }

    const currentBookingsEnd = await Booking.findAll({
      where: {
        id: {
          [Op.not]: bookingId
        },
        spotId: updateBooking.spotId,
        startDate: {
          [Op.between]: [sDate, eDate]
        }
      }
    });

    if (currentBookingsEnd.length > 0) {
      const err = new Error("Sorry, this spot is already booked for the specified dates");
      err.status = 403;
      err.errors = "End date conflicts with an existing booking";
      next(err);
    }

    updateBooking.startDate = startDate;
    updateBooking.endDate = endDate;
    await updateBooking.save()

    res.status(200)
    res.json(updateBooking)
  })

// //Delete a Review
// router.delete(
//   '/:id',
//   requireAuth,
//   async (req, res, next) => {
//     const reviewId = +req.params.id;

//     const review = await Review.findByPk(reviewId);

//     if(!review) {
//       const err = new Error("Spot couldn't be found");
//       err.message = "Spot couldn't be found";
//       err.status = 404;
//       return next(err);
//     }

//     if (review.userId !== req.user.id) {
//       const err = new Error("Need to be owner of the spot to delete a Spot");
//       err.message = "Need to be owner of the spot to delete a Spot";
//       err.status = 403;
//       return next(err);
//     }

//     await review.destroy();

//     res.json({
//       message: 'Successfully deleted',
//       "statusCode": 200
//     })
//   }
// );

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
