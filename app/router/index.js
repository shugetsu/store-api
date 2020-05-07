/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./admin')(app)
  require('./client')(app)
}
