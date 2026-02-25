module.exports = {
    createClassroom: [
        {
            required: true,
            model: 'classroomname',
        },
        {
            required: true,
            model: 'schoolid',
        },
    ],
    updateClassroom: [
        {
            model: 'id',
            required: true,
        },
        {
            required: true,
            model: 'schoolid',
        },
        {
            required: true,
            model: 'classroomname',
        },
        {
            required: true,
            model: 'schoolid',
        },
    ],
    getClassroom: [
        {
            model: 'id',
            required: true,
        },
    ],
    deleteClassroom: [
        {
            model: 'id',
            required: true,
        },
    ],
}