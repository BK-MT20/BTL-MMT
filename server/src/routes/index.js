const userRouter = require('./user')
const authRouter = require('./auth')

function route(app) {

    app.use('/user', userRouter)
    app.use('/api/auth',authRouter)
}

module.exports = route