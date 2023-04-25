const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();




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
