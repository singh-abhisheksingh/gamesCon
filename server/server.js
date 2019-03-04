const express = require('express');
const bodyParser = require('body-parser');

const config=require('./config/config');
const jwt= require('jsonwebtoken');

const gameRoutes = require('./routes/gameRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const port = process.env.PORT || 3000;
var app = express();

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Expose-Headers', 'x-auth');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,content-type, Accept , x-auth');
  next();
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/game', gameRoutes);
app.use('/leader', leaderboardRoutes)

app.post('/score',authenticate ,async (req, res) => {
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(req.body, null, 2));
});

// var errorPg = path.join(__dirname, "../public/views/404.html");
app.get("*", function(req,res){
  // res.sendFile(errorPg);
  res.send('404 Page Not found');
});

authenticate=function(req,res,next){
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

app.listen(port, '192.168.12.129', () => {
  console.log(`Server is up on port ${port}`);
});
