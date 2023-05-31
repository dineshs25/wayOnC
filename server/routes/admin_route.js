const express = require('express');
const router = express.Router();
const showmore = require('../controllers/adminControle/showmore');
const showdetails = require('../controllers/adminControle/showdetails');
// const adminlogin = require('../controllers/adminControle/adminlogin');
const formdetail = require('../controllers/adminControle/formdetail');
const login = require('../controllers/adminControle/adminlogin');
const logout = require('../controllers/adminControle/logout');
const earners = require('../controllers/adminControle/earners');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const clientsData = require('../controllers/adminControle/clientsData');
const adminAuth = require('../controllers/adminControle/adminAuth');
const receivedforms = require('../controllers/adminControle/receivedforms');
const verification = require('../controllers/adminControle/verification');
const adminProfile = require('../controllers/adminControle/adminProfile');
const changeCred = require('../controllers/adminControle/changeCred');
const total = require('../controllers/adminControle/total');
const requests = require('../controllers/adminControle/requests');

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

router.get('/clientsdata', clientsData);
router.post('/showmore', showmore);
router.post('/showdetails', showdetails);
router.post('/login', login);
router.get('/auth', adminAuth);
router.post('/logout', logout);
router.get('/receivedforms', receivedforms);
router.get('/formdetail/:id', formdetail);
router.post('/verification', verification);
router.get('/earners', earners);
router.get('/adminProfile', adminProfile);
router.post('/changeCred', changeCred);
router.get('/total', total);
router.get('/requests', requests);

module.exports = router;
