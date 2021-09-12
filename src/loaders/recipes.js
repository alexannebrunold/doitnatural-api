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

function createRecipe(req, res, next) {
  console.log('REQ', req);
  db('recipes')
    .insert({
      name: req.body.name,
      // created_on: new Date()
    })
    .returning(['*'])
  next()
}

export default {
  getAllRecipes,
  getOneRecipe,
  createRecipe
}