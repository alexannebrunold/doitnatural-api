import express from 'express'
const router = express.Router()
import usersLoader from '../loaders/users.js'
// import {verifyToken} from '../middlewares/token'

//Private
router.get('/', (req, res) => {
  res.json('HomePage')
})

//Public
// User
router.post('/createUser', usersLoader.createNewUser)
router.post('/login', usersLoader.userConnexion)

export default router