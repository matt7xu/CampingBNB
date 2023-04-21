const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Get details of a Spot from an id
router.get(
  '/:id',
  async (req, res) => {
    const id = +req.params.id;

    let spot = await Spot.findOne({
      where: {
        id
      },
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"
          ],
          [
            sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"
          ]
        ],
      },
      include: [
        {
          model: Review,
          attributes: []
        },
        {
          model: Spotimage,
          attributes: ['id', 'url', 'preview']
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
      ],
      group: "Spotimages.id"
    });

    if(!spot){
      const err = new Error("Spot couldn't be found");
      err.message = "Spot couldn't be found";
      err.status = 404;
      throw err;
    }

    let ret = {};

    spot = spot.toJSON();

    ret.id = spot.id;
    ret.ownerId = spot.ownerId;
    ret.address = spot.address;
    ret.city = spot.city;
    ret.state = spot.state;
    ret.country = spot.country;
    ret.lat = spot.lat;
    ret.lng = spot.lng;
    ret.name = spot.name;
    ret.description = spot.description;
    ret.price = spot.price;
    ret.createdAt = spot.createdAt;
    ret.updatedAt = spot.updatedAt;
    ret.numReviews = spot.numReviews;
    ret.avgStarRating = spot.avgStarRating;
    ret.SpotImages = spot.Spotimages;
    ret.Owner = spot.User;

    res.json(ret);
  })


//Get all Spots
router.get(
  '/',
  async (req, res) => {
    const spots = await Spot.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"
          ]
        ],
      },
      include: [
        {
          model: Review,
          attributes: []
        },
        {
          model: Spotimage,
          attributes: ['url']
        },
      ],
      group: "Spot.id"
    });

    let ret = [];

    spots.forEach(spot => {

      spot = spot.toJSON();
      console.log(spot.avgRating)
      let each = {};
      each.id = spot.id;
      each.ownerId = spot.ownerId;
      each.address = spot.address;
      each.city = spot.city;
      each.state = spot.state;
      each.country = spot.country;
      each.lat = spot.lat;
      each.lng = spot.lng;
      each.name = spot.name;
      each.description = spot.description;
      each.price = spot.price;
      each.createdAt = spot.createdAt;
      each.updatedAt = spot.updatedAt;
      each.avgRating = spot.avgRating;
      if (spot.Spotimages[0]) {
        each.previewImage = spot.Spotimages[0].url
      }


      ret.push(each)
    })
    res.json({
      Spots: ret
    });
  })


//

module.exports = router;
