const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const product = require("./src/v1/product/product.controller");
dotenv.config();
require('./config/database');
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);


app.use(bodyParser.json());
app.use('/api/v1/product',product);
module.exports =  app;