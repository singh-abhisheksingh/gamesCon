const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
	name :{
		type: String,
		required: [true, 'Name field is required'],
		minlength: 1,
		trim: true,
		uppercase: true
	},
	admission_no :{
		type: String,
		required: [true, 'Admission no. is required'],
		minlength: 7,
		unique: true,
		trim: true,
		uppercase: true
	},
	gamesScore:[{
		gameId: Number,
		score: {type: Number, default: 0},
		percentile: {type: Number, default: 0}
	}],
	finalPercentile: {type: Number, default: 0}
});

module.exports = mongoose.model('User', UserSchema);
