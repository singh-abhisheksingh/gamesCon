const express = require('express');
const bodyParser = require('body-parser');

const gameRoutes = require('./routes/gameRoutes');

const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/game', gameRoutes);

app.post('/', (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
