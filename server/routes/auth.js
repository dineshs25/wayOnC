const express = require('express');
const router = express.Router();
const login = require('../controllers/credControle/login');
const logout = require('../controllers/credControle/logout');
const register = require('../controllers/credControle/register');
const authControll = require('../controllers/credControle/authControll');
const update = require('../controllers/credControle/update');
const cookieParser = require('cookie-parser');
const cors = require('cors');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(cookieParser());
router.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
  })
);

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.post('/auth', authControll);
router.put('/update', update);

module.exports = router;
