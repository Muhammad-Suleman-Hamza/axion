const mongoose = require('mongoose')
var studentSchema = new mongoose.Schema({
    schoolid: String,
    studentname: String,
    classroomid: String,
})

var StudentModel = mongoose.model('student', studentSchema)
module.exports = class Student {

    constructor() { }

    async createStudent({ studentname, classroomid, schoolid }) {
        try {
            const student = { studentname, classroomid, schoolid };

            const result = await this.validators.student.createStudent(student);
            if (result) return result;

            const studentCreated = await StudentModel(student).save()

            return {
                student: studentCreated
            };
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async updateStudent({ id, studentname, classroomid, schoolid }) {
        try {
            const student = { id, studentname, classroomid, schoolid };

            const result = await this.validators.student.updateStudent(student);
            if (result) return result;
            
            await StudentModel.updateOne({ _id: id }, student)
            const studentUpdated = await StudentModel.findOne({ _id: id })

            if (studentUpdated) return { student: studentUpdated };
            else throw "Student not found";
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getStudent({ id }) {
        try {
            const studentInput = { id };

            const result = await this.validators.student.getStudent(studentInput);
            if (result) return result;

            const student = await StudentModel.findOne({ _id: id })

            if (student) return { student };
            else throw "Student not found";
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async deleteStudent({ id }) {
        try {
            const studentInput = { id };

            const result = await this.validators.student.deleteStudent(studentInput);
            if (result) return result;

            const student = await StudentModel.deleteOne({ _id: id });

            if (student.deletedCount > 0) return "Deleted successfully";
            else throw "Student not found";
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getStudents({ limit = 10, offset = 0 }) {
        try {
            const skip = offset * limit
            const students = await StudentModel.find({}, {}, { limit, skip })
            return {
                students: students,
                limit,
                offset
            };
        } catch (error) {
            console.log(error)
            return error
        }
    }
}