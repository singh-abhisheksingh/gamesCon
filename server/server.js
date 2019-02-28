const express = require('express');
const bodyParser = require('body-parser');

const gameRoutes = require('./routes/gameRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/game', gameRoutes);
app.use('/leader', leaderboardRoutes)

app.post('/', (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
