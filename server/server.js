const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');

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

app.get('*', function(req,res){
  res.status(404).redirect('http://gamescon.surge.sh/404.html');
  res.end();
});

app.listen(port, '192.168.1.9', () => {
  console.log(`Server is up on port ${port}`);
});
