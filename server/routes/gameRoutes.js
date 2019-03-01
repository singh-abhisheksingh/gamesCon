const express = require('express');
const router = express.Router();

var mongoose = require('./../db/connectDB');
var User = require('./../models/user');

router.route('/:id/submit').post(async (req, res) => {
  var game = req.params.id;
  console.log(req.body);

  var nam = req.body.name.toUpperCase();
  var ad_no = req.body.admission_no.toUpperCase();
  var score = req.body.score;

  var user = await User.findOne({admission_no: ad_no});
  if(!user){
    user = new User({name:nam, admission_no:ad_no, gamesScore:[{gameId:1},{gameId:2},{gameId:3},{gameId:4},{gameId:5},{gameId:6},{gameId:7},{gameId:8}]});
  }
  var prevScore = user.gamesScore[game-1].score;
  if(!prevScore || score>prevScore){
    user.gamesScore[game-1].score = score;
  }

  res.setHeader('Content-Type', 'application/json');

  user.save(function (err) {
    if(err) {
      console.log("Could not save user. Kindly provide correct details.");
      res.end(JSON.stringify({
        status: "failure",
        data: [],
        message: "Invalid credentials. Try Again."
      }, null, 2));
      return;
    }

    res.end(JSON.stringify({
      status: "success",
      data: user,
      message: "User score saved successfully."
    }, null, 2));
  });

});

router.route('/:id/leader').get(async (req, res) => {
  var game = req.params.id;
  console.log(game);
  var users = await User.aggregate([
    {
			$project: {
        gScore: { $arrayElemAt: ['$gamesScore', game-1]}
			}
		},
		{
			$sort: {
			 'gScore.score': -1
			}
		}
  ]);
  var ranks = {
    status: "success",
    data: users,
    message: "Scores retrieved succesfully"
  };
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(ranks, null, 2));
});

module.exports = router;
