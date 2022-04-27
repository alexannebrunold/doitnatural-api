import db from '../config/dbConnection.js'

function getAllRecipes(req, res, next) {
  db('recipes')
    .select('*')
    .where('user_id', '=', req.currentUserId.userId)
    .then((recipes) => {
      res.json({ 
        message: recipes 
      })
    })
    .catch((error) => {
      res.json({ 
        message: error 
      })
    })
}

function getRecipeById(req, res, next) {
 db('recipes')
    .select('*')
    .where('user_id', '=', req.currentUserId.userId)
    .andWhere('id', '=', req.body.id)
    .first()
}

function createRecipe(req, res) {
  return db('recipes')
    .insert({
      name: req.body.name,
      user_id: req.currentUserId.userId,
      created_on: new Date()
    })
    .then(() => {
      res.json({ 
        message : 'recipe created'
      })
    })
    .catch((error) => {
      res.json({ 
        message: error 
      })
    })
}

export default {
  getAllRecipes,
  getRecipeById,
  createRecipe
}