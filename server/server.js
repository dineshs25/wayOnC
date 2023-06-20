const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('node:https');
const request = require('request');
const mongoose = require('mongoose');
const client_collection = require('./models/client');
const client = require('./routes/client_route');
const admin = require('./routes/admin_route');
const auth = require('./routes/auth');
const user = require('./routes/user_route');
require('dotenv').config();

const { TaxDeduction } = require('./deductions/taxDeduction');
const { MonthChecker } = require('./monthCheck/monthChecker');

const app = require('express')();

const investor_collection = require('./models/investers');

const cron = require('node-cron');
const { StateUpdate } = require('./extendState/stateUpdate');

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://www.wayonc.com',
      'https://wayonc.com',
    ],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

mongoose
  .connect(process.env.MONGODB_API)
  .then(() => {
    console.log('DB_Connected');
  })
  .catch(() => {
    console.log('DB Connection failed');
  });
app.get('/', (req, res) => {
  res.redirect('https://wayonc.com');
});
app.get('/api', (req, res) => {
  res.redirect('https://wayonc.com');
});
app.use('/api/client', client);
app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/user', user);

cron.schedule('*/10 * * * * *', () => {
  const date = new Date().toISOString().substring(0, 10);
  investor_collection.find().then((result) => {
    result.map((doc) => {
      const len = doc.plan.arrayMonths.length - 2;
      if (doc.plan.arrayMonths[len] === date) {
        StateUpdate(doc);
      }
      const plan = doc.plan.arrayMonths;
      plan.map((dates, index) => {
        if (dates === date) {
          if (index === 0) {
            if (doc.plan.principal === 100000) {
              const ded = 2480;
              TaxDeduction(doc, index, ded);
            } else if (
              doc.plan.principal >= 100001 &&
              doc.plan.principal <= 500000
            ) {
              const ded = 2590;
              TaxDeduction(doc, index, ded);
            } else if (
              doc.plan.principal >= 500001 &&
              doc.plan.principal <= 1000000
            ) {
              const ded = 2960;
              TaxDeduction(doc, index, ded);
            } else if (
              doc.plan.principal >= 1000001 &&
              doc.plan.principal <= 2000000
            ) {
              const ded = 3660;
              TaxDeduction(doc, index, ded);
            } else if (doc.plan.principal >= 2000001) {
              const ded = 4860;
              TaxDeduction(doc, index, ded);
            }
          } else {
            if (doc.plan.principal === 100000) {
              const ded = 2480;
              MonthChecker(doc, index, ded);
            } else if (
              doc.plan.principal >= 100001 &&
              doc.plan.principal <= 500000
            ) {
              const ded = 2590;
              MonthChecker(doc, index, ded);
            } else if (
              doc.plan.principal >= 500001 &&
              doc.plan.principal <= 1000000
            ) {
              const ded = 2960;
              MonthChecker(doc, index, ded);
            } else if (
              doc.plan.principal >= 1000001 &&
              doc.plan.principal <= 2000000
            ) {
              const ded = 3660;
              MonthChecker(doc, index, ded);
            } else if (doc.plan.principal >= 2000001) {
              const ded = 4860;
              MonthChecker(doc, index, ded);
            }
          }
        }
      });
    });
  });
});

app.listen(8000, () => {
  console.log('Server started');
});
