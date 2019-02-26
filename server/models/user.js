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
	gameScore1: Number,
	gamePercentile1: Number,
	gameScore2: Number,
	gamePercentile2: Number,
	gameScore3: Number,
	gamePercentile3: Number,
	gameScore4: Number,
	gamePercentile4: Number,
	gameScore5: Number,
	gamePercentile5: Number,
	gameScore6: Number,
	gamePercentile6: Number,
	gameScore7: Number,
	gamePercentile7: Number,
	gameScore8: Number,
	gamePercentile8: Number,
  percentile: Number
});

module.exports = mongoose.model('User', UserSchema);
