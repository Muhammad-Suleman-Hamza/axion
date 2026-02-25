const mongoose = require('mongoose')
var schoolSchema = new mongoose.Schema({
    schoolname: String,
})

var SchoolModel = mongoose.model('school', schoolSchema)
module.exports = class School {

    constructor() { }

    async createSchool({ schoolname }) {
        try {
            const school = { schoolname };

            const result = await this.validators.school.createSchool(school);
            if (result) return result;

            const schoolCreated = await SchoolModel(school).save()
            
            return {
                school: schoolCreated
            };
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async updateSchool({ id, schoolname }) {
        try {
            const school = { id, schoolname };

            const result = await this.validators.school.updateSchool(school);
            if (result) return result;

            await SchoolModel.updateOne({ _id: id }, school)
            const schoolUpdated = await SchoolModel.findOne({ _id: id })

            if (schoolUpdated) return { school: schoolUpdated };
            else throw "School not found";
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getSchool({ id }) {
        try {
            const schoolInput = { id };
            
            const result = await this.validators.school.getSchool(schoolInput);
            if (result) return result;
            
            const school = await SchoolModel.findOne({ _id: id })
            
            if (school) return { school };
            else throw "School not found";
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async deleteSchool({ id }) {
        try {
            const schoolInput = { id };
            
            const result = await this.validators.school.deleteSchool(schoolInput);
            if (result) return result;

            const school = await SchoolModel.deleteOne({ _id: id });

            if (school.deletedCount > 0) return "Deleted successfully";
            else throw "School not found";
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getSchools({ limit = 10, offset = 0 }) {
        try {
            const skip = offset * limit
            const schools = await SchoolModel.find({}, {}, { limit, skip })

            return {
                schools: schools,
                limit,
                offset
            };
        } catch (error) {
            console.log(error)
            return error
        }
    }
}