import express from 'express'
const router = express.Router()
import usersLoader from '../loaders/users.js'
import recipesLoader from '../loaders/recipes.js'
import token from '../middlewares/token.js'
import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js'

//Private
router.get('/', (req, res) => {
  res.json('HomePage')
})

router.get('/allRecipes', token.verifyToken, recipesLoader.getAllRecipes)
router.get('/recipe', token.verifyToken, recipesLoader.getOneRecipe)
router.post('/createRecipe', token.decodedToken, recipesLoader.createRecipe)

//Public
// User
router.post('/createUser', usersLoader.createNewUser, (req, res) => {
  console.log(res);
  res.json(res.body)
})
router.post('/login', usersLoader.userConnexion)

export default router