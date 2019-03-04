const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

var mongoose = require('./../db/connectDB');
var User = require('./../models/user');

authenticate = function(req,res,next){
  try{
    decoded= jwt.verify(req.header('x-auth'),process.env.JWT_SECRET);
    if(decoded.username==process.env.USERNAME&&decoded.password==process.env.PASSWORD){
      next();
    }
    else{
      res.status(401).send();
    }
  }catch(e){
    res.status(401).send();
  }
};

router.route('/').get(authenticate, async (req, res) => {
  // user.gamesScore[game-1].percentile = await calculatePercentile(game, score);
  var users = await User.find();
  for(var i=0; i<users.length; i++){
    var finalPer = 0;
    for(var game=1; game<=8; game++){
      var score = await users[i].gamesScore[game-1].score;
      var per = await calculatePercentile(game, score);
      users[i].gamesScore[game-1].percentile = per;

      // await User.updateOne(
      //   {"admission_no": users[i].admission_no},
      //   { $set:
      //     {"gamesScore.0.percentile": per}
      //   }
      // );

      finalPer += per;
    }
    await User.updateOne(
      {"admission_no": users[i].admission_no},
      { $set:
        {"finalPercentile": finalPer/8}
      }
    );
    // users[i].finalPercentile = finalPer/8;
  }

  var users = await User.find().sort({finalPercentile: -1}).select({ "name": 1, "admission_no": 1, "finalPercentile": 1, "_id": 0});
  var ranks = {
    status: "success",
    data: users,
    message: "Ranks retrieved succesfully"
  };
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(ranks, null, 2));
});

async function calculatePercentile(game, score){
  var less = await User.find({
    gamesScore: {
      $elemMatch: {
        gameId: game,
        score: {$lte: score}
      }
    }
  }).countDocuments();
  var len = await User.find().countDocuments();
  if(len == 0){
    len = 1;
    less = 1;
  }
  return less/len*100;
}

router.route('/getAuthToken').get(function(req,res){
  var apiKey = jwt.sign({username:process.env.USERNAME,password:process.env.PASSWORD},process.env.JWT_SECRET).toString();
  console.log(apiKey);
});

module.exports = router;
