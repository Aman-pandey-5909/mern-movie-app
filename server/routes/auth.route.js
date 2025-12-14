const Router = require('express').Router()
const validatezod = require('../middlewares/validatezod')
const { signupSchema, loginSchema } = require('../schemas/auth')

const {signup, login, adminLogin} = require('../controllers/auth.controller')

//normal user
Router.post('/signup', validatezod(signupSchema), signup)
Router.post('/login', validatezod(loginSchema), login)

//admin
Router.post('/adminlogin', validatezod(loginSchema), adminLogin)

module.exports = Router 