const express = require('express');

const port = process.env.PORT || 3000;
var app = express();

app.use(express.static('public'))

app.get('/games', (req, res) => {
  res.send('Following is the list of games');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
