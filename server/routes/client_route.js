const express = require('express');
const router = express.Router();
const client_post = require('../controllers/clientControle/client_post');
const client_get = require('../controllers/clientControle/client_get');
const client_images = require('../controllers/clientControle/client_images');
const invest = require('../controllers/clientControle/invest');
const user = require('../controllers/clientControle/user');
const paidamt = require('../controllers/clientControle/paidamt');
const req = require('../controllers/clientControle/req');
const profile = require('../controllers/clientControle/profie');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const investedClient = require('../controllers/clientControle/investedClient');


router.use(express.json());
router.use(cookieParser());
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
  })
);

router.post('/client_post', client_post);
// router.get('/client_get', client_get);
router.post('/client_images', client_images);
router.post('/user', user);
router.post('/:slug/invest', invest);
router.post('/paidamt', paidamt);
router.put('/req', req);
router.post('/profile', profile);
router.get('/investedClient/:userAuth', investedClient);


module.exports = router;
