const express = require('express');
const router = express.Router();
const cors = require('cors');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const login = require('../controllers/userControle/login');
const userAuth = require('../controllers/userControle/userAuth');
const logout = require('../controllers/userControle/logout');

router.use(express.json());
router.use(cookieParser());
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(
  cors({
    origin: ['http://localhost:3000','https://www.wayonc.com','https://wayonc.com'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
  })
);


router.post('/login', login);
router.get('/auth', userAuth);
router.post('/logout', logout);








module.exports = router;
