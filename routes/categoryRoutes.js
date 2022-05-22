const Controller = require('../controllers/categoryController')

const categoryRouter = require('express').Router()
const { authentication } = require("../middlewares/auth");


categoryRouter.get('/', authentication, Controller.getCategory)
categoryRouter.post('/', authentication, Controller.postCategory)


module.exports = categoryRouter