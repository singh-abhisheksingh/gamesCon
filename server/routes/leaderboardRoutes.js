const express = require('express');
const router = express.Router();

var mongoose = require('./../db/connectDB');
var User = require('./../models/user');

router.route('/').get(async (req, res) => {
  
  var users = await User.find().sort({finalPercentile: -1});
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users, null, 2));
});

module.exports = router;
