import express from 'express'
const router = express.Router()
import usersLoader from '../query/users.js'
import recipesLoader from '../query/recipes.js'
import token from '../middlewares/token.js'

//Private
router.get('/', (req, res) => {
  res.json('HomePage')
})

router.get('/allRecipes', token.decodedToken, recipesLoader.getAllRecipes)
router.get('/recipe/:id', token.decodedToken, recipesLoader.getRecipeById)
router.post('/createRecipe', token.decodedToken, recipesLoader.createRecipe)

//Public
// User
router.post('/createUser', usersLoader.createNewUser, (req, res) => {
  res.json(res.body)
})
router.post('/login', usersLoader.userConnexion)

export default router