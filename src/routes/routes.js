import express from 'express'
const router = express.Router()
// const userModel = require('../models/user')
// const bookModel = require('../models/book')
// import db from '../config/dbConnection'
import bcrypt  from 'bcrypt'
import jwt  from 'jsonwebtoken'
// import config = from '../config/auth.config')
import createNewUser from '../loaders/users.js'

//Private
router.get('/', (req, res) => {
  res.json('HomePage')
})

//Add New User
// console.log(createNewUser().createNewUser);
router.post('/createUser', createNewUser.createNewUser)

export default router