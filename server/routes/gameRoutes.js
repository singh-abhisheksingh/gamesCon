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

  user.save(function (err) {
    if(err) {
      console.error(err);
    }
  });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(user, null, 2));
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

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users, null, 2));
});

module.exports = router;
