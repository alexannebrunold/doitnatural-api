import db from '../config/dbConnection.js'

function getAllRecipes(req, res, next) {
  db('recipes')
    .select('*')
    .where('user_id', '=', req.currentUserId.userId)
    .then((recipes) => {
      console.log(recipes)
      res.json({ message: recipes })
    })
    .catch((error) => {
      res.json({ message: error })
    })
}

function getRecipeById(req, res, next) {
 db('recipes')
    .select('*')
   .where('user_id', '=', req.currentUserId.userId)
   .andWhere('id', '=', req.body.id)
    .first()
    .then((recipe) => {
    console.log(recipe);
      res.json({message : recipe})
    })
    .catch((error) => {
      res.json({ message: error })
    })
}

function createRecipe(req, res) {
  return db('recipes')
    .insert({
      name: req.body.name,
      user_id: req.currentUserId.userId,
      // created_on: new Date()
    })
    .then(() => {
      res.json({message : 'recipe created'})
    })
    .catch((err) => {
      res.json({ message: err })
    })
}

export default {
  getAllRecipes,
  getRecipeById,
  createRecipe
}