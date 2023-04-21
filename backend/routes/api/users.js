const express = require('express')
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

//Get all Spots owned by the Current User
router.get(
  '/owned/spots',
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


// Restore session user
router.get(
  '/',
  (req, res) => {
    const { user } = req;
    if (user) {
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
      return res.json({
        user: safeUser
      });
    } else return res.json({ user: null });
  }
);

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    try {
      const user = await User.create({ firstName, lastName, email, username, hashedPassword });
    } catch (e) {
      const err = new Error('User already exists');
      err.status = 403;
      err.title = 'SignUp failed';
      err.errors = "User with that email already exists";
      throw err;
    }

    // if (!user) {
    //   const err = new Error('User already exists');
    //   err.status = 403;
    //   err.title = 'SignUp failed';
    //   //err.errors = { credential: 'The provided credentials were invalid.' };
    //   return next(err);
    // }


    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: ""
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

// Log in
router.post(
  '/login',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      err.title = 'Login failed';
      //err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: ""
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

module.exports = router;
