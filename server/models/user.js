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
    lowercase: true
	},
  game: {
    type: Number,
    default: null
  },
  percentile :{
    type: String,
    default: null
  }
});

module.exports = mongoose.model('User', UserSchema);
