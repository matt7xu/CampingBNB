const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Spotimage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



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

    spots.forEach(spot=>{

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
      if(spot.Spotimages[0]){
        each.previewImage = spot.Spotimages[0].url
      }


      ret.push(each)
    })
        res.json({
          Spots: ret
        });
      })

module.exports = router;
