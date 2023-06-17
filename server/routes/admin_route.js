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
const payCheckout = require('../controllers/adminControle/payCheckout');
const backups = require('../controllers/adminControle/backups');
const backupSM = require('../controllers/adminControle/backupSM');
const deleteForm = require('../controllers/adminControle/deleteForm');
const viewEmployees = require('../controllers/adminControle/viewEmployees');
const addEmployee = require('../controllers/adminControle/addEmployee');
const deleteUser = require('../controllers/adminControle/deleteUser');
const upload = require('../controllers/adminControle/upload');
const assignInterest = require('../controllers/adminControle/assignInterest');
const investVer = require('../controllers/adminControle/investVer');
const invVerShowDetail = require('../controllers/adminControle/invVerShowDetail');
const unConfirmDel = require('../controllers/adminControle/unConfirmDel');

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

router.get('/clientsdata', clientsData);
router.post('/showmore', showmore);
router.post('/showdetails', showdetails);
router.post('/login', login);
router.post('/auth', adminAuth);
router.post('/logout', logout);
router.get('/receivedforms', receivedforms);
router.get('/formdetail/:id', formdetail);
router.post('/verification', verification);
router.get('/earners', earners);
router.get('/adminProfile', adminProfile);
router.post('/changeCred', changeCred);
router.get('/total', total);
router.get('/requests', requests);
router.post('/payCheckout', payCheckout);
router.get('/backups', backups);
router.post('/backupSM', backupSM);
router.delete('/deleteForm/:id', deleteForm);
router.get('/viewEmployees', viewEmployees);
router.post('/addEmployee', addEmployee);
router.delete('/deleteUser/:id', deleteUser);
router.post('/agreements/upload', upload);
router.put('/assignInterest', assignInterest);
router.get('/investVer', investVer);
router.post('/investVer/showdetails', invVerShowDetail);
router.delete('/unconfirm/delete/:id', unConfirmDel);

module.exports = router;
