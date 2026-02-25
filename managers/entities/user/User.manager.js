const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

var userSchema = new mongoose.Schema({
    role: String,
    email: String,
    password: String,
    username: String,
    schools: [String],
})

var UserModel = mongoose.model('user', userSchema);

module.exports = class User {

    constructor({ utils, cache, config, cortex, managers, validators, mongomodels } = {}) {
        this.config = config;
        this.cortex = cortex;
        this.validators = validators;
        this.mongomodels = mongomodels;
        this.usersCollection = "users";
        this.userExposed = ['createUser'];
        this.tokenManager = managers.token;
    }

    async createUser({ username, email, password, role }) {
        try {
            const user = { username, email, password, role };
            const isUserExists = await UserModel.findOne({ email })

            if (isUserExists) {
                throw 'user already exists'
            }

            // Data validation
            const result = await this.validators.user.createUser(user);
            if (result) return result;

            // Creation Logic
            const createdUser = { username, email, password, role }
            const hash = await bcrypt.hash(createdUser.password, saltRounds)
            createdUser.password = hash
            
            await UserModel(createdUser).save()
            const longToken = this.tokenManager.genLongToken({ 
                entities: [] ,
                role: createdUser.role, 
                userId: createdUser._id, 
                userKey: createdUser.key
            });

            // Response
            return {
                user: {
                    id: createdUser._id,
                    role: createdUser.role,
                    email: createdUser.email,
                    username: createdUser.username,
                },
                longToken
            };

        } catch (e) {
            console.log(e)
            return { "error": String(e) }
        }
    }

    async loginUser({ email, password }) {
        try {
            const validate = { email, password };

            const result = await this.validators.user.loginUser(validate);
            if (result) return result;

            const user = await UserModel.findOne({ email });

            if (!user) {
                throw "Invalid email"
            }

            const isValidPassword = await bcrypt.compare(password, user.password)

            if (!isValidPassword) {
                throw "Invalid password"
            }

            const schools = user.schools || []
            const longToken = this.tokenManager.genLongToken({ 
                schools,
                role: user.role,
                userId: user._id,
                userKey: user.key,
            });

            return {
                user: {
                    schools,
                    id: user._id,
                    role: user.role,
                    token: longToken,
                    email: user.email,
                    username: user.username
                },
            };

        } catch (e) {
            return { "error": String(e) }
        }
    }

    async assign({ admins, schools }) {
        try {
            const assignObj = { admins, schools };
            const result = await this.validators.user.assign(assignObj);

            if (result) return result;

            const createdUser = await UserModel.updateMany({ _id: { $in: admins } }, [{ $set: { schools } }]);

            if (createdUser.matchedCount > 0) return "Admins assigned successfully";
            else throw "Admins not found"
        } catch (e) {
            return { "error": String(e) }
        }
    }
}