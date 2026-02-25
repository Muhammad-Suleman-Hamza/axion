const mongoose = require('mongoose')
var classroomSchema = new mongoose.Schema({
    schoolid: String,
    classroomname: String,
})

var ClassroomModel = mongoose.model('classroom', classroomSchema)
module.exports = class Classroom {

    constructor() { }

    async createClassroom({ classroomname, schoolid }) {
        try {
            const classroom = { classroomname, schoolid };

            const result = await this.validators.classroom.createClassroom(classroom);
            if (result) return result;

            const classroomCreated = await ClassroomModel(classroom).save()

            return {
                classroom: classroomCreated
            };
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async updateClassroom({ id, classroomname, schoolid }) {
        try {
            const classroom = { id, classroomname, schoolid };

            const result = await this.validators.classroom.updateClassroom(classroom);
            if (result) return result;

            await ClassroomModel.updateOne({ _id: id }, classroom)
            const classroomUpdated = await ClassroomModel.findOne({ _id: id })

            if (classroomUpdated) return { classroom: classroomUpdated };
            else throw "Classroom not found";
            
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getClassroom({ id, schoolid }) {
        try {
            const classroomInput = { id };

            const result = await this.validators.classroom.getClassroom(classroomInput);
            if (result) return result;

            const classroom = await ClassroomModel.findOne({ _id: id })

            if (classroom) return { classroom };
            else throw "Classroom not found";
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async deleteClassroom({ id, schoolid }) {
        try {
            const classroomInput = { id };
           
            const result = await this.validators.classroom.deleteClassroom(classroomInput);
            if (result) return result;
            
            const classroom = await ClassroomModel.deleteOne({ _id: id })
         
            if (classroom.deletedCount > 0) return "Deleted successfully";
            else throw "Classroom not found";
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getClassrooms({ limit = 10, offset = 0 }) {
        try {
            const skip = offset * limit
            const classrooms = await ClassroomModel.find({}, {}, { limit, skip })
            
            return {
                classrooms: classrooms,
                limit,
                offset
            };
        } catch (error) {
            console.log(error)
            return error
        }
    }
}