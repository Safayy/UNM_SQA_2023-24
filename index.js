const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.static('./.'));
app.listen(process.env.PORT || 3000);
console.log('Running at Port 3000');