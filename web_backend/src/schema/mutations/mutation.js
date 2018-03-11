import { GraphQLID, GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList } from 'graphql';
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import GradeType from '../types/GradeType'
import StudentType from '../types/StudentType'
import Student from '../../models/student';
import AdminType from '../types/AdminType'
import Admin from '../../models/admin';
import TeacherType from '../types/TeacherType'
import Teacher from '../../models/teacher';
import QuizType from '../types/QuizType'
import Quiz from '../../models/quiz';
import InputQuestionType from '../types/InputQuestionType.js'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Your Root Mutation',
  fields() {
    return {
      createStudent: {
        type: StudentType,
        args: { name: { type: GraphQLString }, email: { type: GraphQLString } },
        resolve(root, { name, email}, ctx) {
          const s = new Student({ name, email });
          return s.save()
        } 
      },
      createTeacher: {
        type: TeacherType,
        args: { name: { type: GraphQLString }, 
                email: { type: GraphQLString }
              },
        resolve(root, { name, email }, ctx) {
          const t = new Teacher({ name, email });
          return t.save()
        } 
      },
      createAdmin: {
        type: AdminType,
        args: { name: { type: GraphQLString },
                email: { type: GraphQLString }
              },
        resolve(root, { name, email }, ctx) {
          const a = new Admin({ name, email });
          return a.save()
        } 
      },
      createQuiz: {
        type: QuizType,
        args: { name: { type: GraphQLString },
                questions: { type: new GraphQLList(InputQuestionType) }
              },
        resolve(root, { name, questions }, ctx) {
          const q = new Quiz({ name, questions });
          return q.save()
        } 
      },
      deleteAdmin: { 
        type: AdminType,
        args: { id: {type: new GraphQLNonNull(GraphQLID)} },
        resolve(root, {id}, ctx){
          return Admin.findByIdAndRemove(id);
        }
      },
      deleteQuiz: { 
        type: QuizType,
        args: { id: {type: new GraphQLNonNull(GraphQLID)} },
        resolve(root, {id}, ctx){
          return Quiz.findByIdAndRemove(id);
        }
      },
      addGrade: {
        type: StudentType,
        args: { id: { type: GraphQLString }, lesson: { type: GraphQLString }, score: { type: GraphQLInt } },
        resolve(root, { id, lesson, score}, ctx) {
          var grade = {"lesson": lesson, "score": score};
          return Student.findOneAndUpdate({"_id": id}, {$push: {"grades": grade}})
        } 
      }, 
      assignStudentToTeacher: {
        type: StudentType, 
        args: {studentID: {type: GraphQLString}, teacherID: {type: GraphQLString}}, 
        resolve(root, {studentID, teacherID}, ctx) {
        if (Student.findById(studentID) && Teacher.findById(teacherID)) {
          return Student.findByIdAndUpdate(studentID, {$set: { teacherID: teacherID }}) && Teacher.findByIdAndUpdate(teacherID, {$push: {"listOfStudentIDs": studentID}})
        }
        }
      },
      addQuestion: {
        type: QuizType,
        args: { id: { type: GraphQLString }, question: { type: InputQuestionType } },
        resolve(root, { id, question }, ctx) {
          return Quiz.findOneAndUpdate({"_id": id}, {$push: {"questions": question}})
        } 
      }, 
      deleteQuestion: {
        type: QuizType,
        args: { id: { type: GraphQLString }, qName: { type: GraphQLString } },
        resolve(root, { id, qName }, ctx) {
          return Quiz.findByIdAndRemove(id)
          // return Quiz.findOneAndUpdate({"_id": id}, {$pullAll: {"questions": [Quiz.find({questionName: qName})]}})
        } 
      }, 
    };
  },
});

export default Mutation;
