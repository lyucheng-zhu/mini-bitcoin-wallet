const userController = require('./../controllers/user.ctrl')

module.exports = (router) => {
    /**
     * sign up
     */
    router
        .route('/user/signup')
        .post(userController.signUp),

    /**
     * log in
     */
    router
        .route('/user/login')
        .post(userController.logIn)
}
