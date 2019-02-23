const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var GameSchema = new Schema({
	number : Number,
	game_score :{
		type: String,
    trim: true
	},
  game_percentile :{
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Game', GameSchema);
