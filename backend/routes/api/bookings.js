const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, sequelize, Reviewimage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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
      const err = new Error("Forbidden");
      err.message = "Forbidden";
      err.status = 403;
      return next(err);
    }

    const currentTime = new Date();
    if (updateBooking.dataValues.startDate <= currentTime || updateBooking.dataValues.endDate <= currentTime) {
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
    };

    if (currentBookingsStart.length === 0 && currentBookingsEnd.length === 0) {
      updateBooking.startDate = startDate;
      updateBooking.endDate = endDate;
      await updateBooking.save()
    };

    res.status(200)
    res.json(updateBooking)
  })

//Delete a Booking
router.delete(
  '/:id',
  requireAuth,
  async (req, res, next) => {
    const bookingId = +req.params.id;

    const deleteBooking = await Booking.findByPk(bookingId);

    if (!deleteBooking) {
      const err = new Error("Booking couldn't be found");
      err.message = "Booking couldn't be found";
      err.status = 404;
      return next(err);
    }

    if (deleteBooking.userId !== req.user.id) {
      const err = new Error("Forbidden");
      err.message = "Forbidden";
      err.status = 403;
      return next(err);
    }

    const currentTime = new Date();
    if (currentTime >= deleteBooking.dataValues.startDate && currentTime <= deleteBooking.dataValues.endDate) {
      const err = new Error("Bookings that have been started can't be deleted");
      err.message = "Bookings that have been started can't be deleted";
      err.status = 403;
      return next(err);
    }

    await deleteBooking.destroy();

    res.json({
      message: 'Successfully deleted',
      "statusCode": 200
    })
  }
);

// Error formatter
router.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);

  let errMessage = {
    message: err.message,
    statusCode: err.status
  }
  if (err.errors) {
    errMessage.errors = [err.errors]
  }
  res.json(
    //title: err.title || 'Server Error',
    // message: err.message,
    // statusCode: err.status,
    // errors: [err.errors]
    //stack: isProduction ? null : err.stack
    errMessage
  );
});
module.exports = router;
