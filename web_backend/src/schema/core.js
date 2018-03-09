import { nodeDefinitions, globalIdField, fromGlobalId } from 'graphql-relay'

import Student from '../models/student';
import StudentType from './types/StudentType';
import AdminType from './types/AdminType'
import Admin from '../models/admin';
import TeacherType from './types/TeacherType'
import Teacher from '../models/teacher';

export const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        const {type, id} = fromGlobalId(globalId);
        let collection;
        switch (type) {
            case 'Admin':
                collection = Admin;
                break;
            case 'Student':
                collection = Student;
                break;
            case 'Teacher':
                collection = Teacher;
                break;
        }
        collection.findById(id);
    },
    (obj) => {
        if(obj.teacherID) return StudentType;
        if(obj.listOfStudentIDs) return TeacherType;
        return AdminType;
    }
);

export const globalId = mongoModelName => globalIdField(mongoModelName, obj => obj._id);
