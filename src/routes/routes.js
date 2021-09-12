import express from 'express'
const router = express.Router()
import usersLoader from '../loaders/users.js'
import recipesLoader from '../loaders/recipes.js'
import verifyToken from '../middlewares/token.js'
import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js'

//Private
router.get('/', (req, res) => {
  res.json('HomePage')
})

router.get('/allRecipes', verifyToken, recipesLoader.getAllRecipes)
router.get('/recipe', verifyToken, recipesLoader.getOneRecipe)
router.post('/createRecipe', verifyToken, (req, res) => {
  const decoded = jwt.verify(req.token, process.env.JWT_SECRET_KEY)
  var userId = decoded.user_data.user_id
  console.log(decoded, userId)
  // jwt.verify(req.token, config.secret, { algorithms: ['RS256'] }, (err, authData) => {
  //   console.log(err, 'cc');
  //   if (err) {
  //     res.sendStatus(403)
  //   } else {
  //     res.json({
  //       message: 'Recipe created...',
  //       authData
  //     })
  //   }
  // });
  // recipesLoader.createRecipe
})

//Public
// User
router.post('/createUser', usersLoader.createNewUser, (req, res) => {
  console.log(res);
  res.json(res.body)
})
router.post('/login', usersLoader.userConnexion)

export default router