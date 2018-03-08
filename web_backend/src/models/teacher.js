import Student from './student.js'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    teacherName: { type: String },
    email: { type: String },
    password: { type: String },
    listOfStudentIDs: [{ type: String }],
  });
  
export default mongoose.model('Teacher', TeacherSchema);