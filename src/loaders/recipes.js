import db from '../config/dbConnection.js'

function getAllRecipes(req, res, next) {
  db('recipes')
    .select('*')
}

function getOneRecipe(req, res, next) {
  db('recipes')
    .select('*')
    .where('id', '=', req.body.id)
    .first()
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
  getOneRecipe,
  createRecipe
}