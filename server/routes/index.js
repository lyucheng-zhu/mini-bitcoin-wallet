const user = require('./user')
const wallet = require('./wallet')

module.exports = (router) => {
    user(router)
    wallet(router)
}
