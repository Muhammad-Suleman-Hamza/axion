

module.exports = {
    createUser: [
        {
            required: true,
            model: 'username',
        },
        {
            required: true,
            model: 'password',
        },
        {
            required: true,
            model: 'email',
        },
        {
            required: true,
            model: 'role',
        },
    ],
    loginUser: [
        {
            required: true,
            model: 'password',
        },
        {
            required: true,
            model: 'email',
        },
    ],
    assign: [
        {
            required: true,
            model: 'admins',
        },
        {
            required: true,
            model: 'schools',
        },
    ],
}


