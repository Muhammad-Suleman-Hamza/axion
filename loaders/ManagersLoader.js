const utils = require('../libs/utils');
const ValidatorsLoader = require('./ValidatorsLoader');
const systemArch = require('../static_arch/main.system');
const MiddlewaresLoader = require('./MiddlewaresLoader');
const ApiHandler = require("../managers/api/Api.manager");
const ResourceMeshLoader = require('./ResourceMeshLoader');
const LiveDB = require('../managers/live_db/LiveDb.manager');
const UserServer = require('../managers/http/UserServer.manager');
const VirtualStack = require('../managers/virtual_stack/VirtualStack.manager');
const ResponseDispatcher = require('../managers/response_dispatcher/ResponseDispatcher.manager');

const TokenManager = require('../managers/token/Token.manager');
const SharkFin = require('../managers/shark_fin/SharkFin.manager');
const TimeMachine = require('../managers/time_machine/TimeMachine.manager');

const user = require('../managers/entities/user/User.manager')
const school = require('../managers/entities/school/School.manager')
const student = require('../managers/entities/student/Student.manager')
const classroom = require('../managers/entities/classroom/Classroom.manager')

/** 
 * load sharable modules
 * @return modules tree with instance of each module
*/
module.exports = class ManagersLoader {
    constructor({ config, cortex, cache, oyster, aeon }) {
        this.managers = {
            "user": {
                "login": "",
                "create": "",
                "assign": "",
            },
            "student": {
                "get": "",
                "create": "",
                "update": "",
                "delete": "",
                "getAll": "",
            },
            "school": {
                "get": "",
                "create": "",
                "update": "",
                "delete": "",
                "getAll": "",
            },
            "classroom": {
                "get": "",
                "create": "",
                "update": "",
                "delete": "",
                "getAll": "",
            }
        };
        
        this.cache = cache;
        this.config = config;
        this.cortex = cortex;

        this._preload();
        this.injectable = {
            aeon,
            utils,
            cache,
            config,
            cortex,
            oyster,
            managers: this.managers,
            validators: this.validators,
            resourceNodes: this.resourceNodes,
        };

        const usr = new user({
            managers: { 'token': new TokenManager(this.injectable) },
            validators: this.validators
        })

        this.managers.user.assign = usr.assign
        this.managers.user.login = usr.loginUser
        this.managers.user.create = usr.createUser
        this.managers.user.validators = this.validators
        this.managers.user.tokenManager = new TokenManager(this.injectable);

        const stnt = new student({})
        this.managers.student.get = stnt.getStudent
        this.managers.student.getAll = stnt.getStudents
        this.managers.student.create = stnt.createStudent
        this.managers.student.update = stnt.updateStudent
        this.managers.student.delete = stnt.deleteStudent
        this.managers.student.validators = this.validators

        const schl = new school({})
        this.managers.school.get = schl.getSchool
        this.managers.school.getAll = schl.getSchools
        this.managers.school.create = schl.createSchool
        this.managers.school.update = schl.updateSchool
        this.managers.school.delete = schl.deleteSchool
        this.managers.school.validators = this.validators

        const cr = new classroom({})
        this.managers.classroom.get = cr.getClassroom
        this.managers.classroom.getAll = cr.getClassrooms
        this.managers.classroom.create = cr.createClassroom
        this.managers.classroom.validators = this.validators
        this.managers.classroom.update = cr.updateClassroom
        this.managers.classroom.delete = cr.deleteClassroom
    }

    _preload() {
        const resourceMeshLoader = new ResourceMeshLoader({})
        const validatorsLoader = new ValidatorsLoader({
            models: require('../managers/_common/schema.models'),
            customValidators: require('../managers/_common/schema.validators'),
        });

        this.validators = validatorsLoader.load();
        this.resourceNodes = resourceMeshLoader.load();
    }

    load() {
        this.managers.liveDb = new LiveDB(this.injectable);
        this.managers.responseDispatcher = new ResponseDispatcher();

        const middlewaresLoader = new MiddlewaresLoader(this.injectable);
        const mwsRepo = middlewaresLoader.load();
        
        this.injectable.mwsRepo = mwsRepo;
        const { layers, actions } = systemArch;
        
        this.managers.shark = new SharkFin({ ...this.injectable, layers, actions });
        this.managers.timeMachine = new TimeMachine(this.injectable);
        this.managers.token = new TokenManager(this.injectable);

        this.managers.mwsExec = new VirtualStack({ ...{ preStack: [/* '__token', */'__device',] }, ...this.injectable });
        this.managers.userApi = new ApiHandler({ ...this.injectable, ...{ prop: 'httpExposed' } });
        this.managers.userServer = new UserServer({ config: this.config, managers: this.managers, mwsRepo: mwsRepo });

        return this.managers;
    }
}