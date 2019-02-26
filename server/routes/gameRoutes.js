const express = require('express');
const router = express.Router();

var mongoose = require('./../db/connectDB');
var User = require('./../models/user');

router.route('/:id').post(async (req, res) => {
  var game = req.params.id;
  console.log(game);
  console.log(req.body);

  var name = req.body.name.toUpperCase();
  var admission_no = req.body.admission_no.toUpperCase();
  var score = req.body.score;

  var user = await User.findOne({admission_no});
  if(!user){
    user = new User({name, admission_no});
  }
  var prevScore = user['gameScore'+game];
  if(!prevScore){
    user['gameScore'+game] = score;
  }
  else if(score>prevScore){
    user['gameScore'+game] = score;
  }
  user.save(function (err) {
    if(err) {
      console.error(err);
    }
  });
  console.log(user);

});



module.exports = router;
