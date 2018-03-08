import Teacher from './teacher.js'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  teacher: { Teacher: String },
  grades: [{
    lesson: {type: String},
    score: {type: Number}
  }]
});
export default mongoose.model('Student', StudentSchema);
