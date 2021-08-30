import validUser from '../middlewares/validations.js'
import db from '../config/dbConnection.js'
import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js'
import passwordUtils from '../utils/passwordUtils.js'

function createNewUser(req, res, next) {
  if (validUser.validUserInformations(req.body)) {
    userIsInDB({ user: req.body }).then((user) => {
      if (user === undefined) {
        passwordUtils.hashPassword(req.body.password).then((passwordHashed) => {
          insertNewUserInDb({ user: req, passwordHashed })
            .then(() => {
              res.redirect('/book')
            })
        })
          .catch((error) => {
            return console.error('ERRRRRROR', error)
          })
      }
      else {
        next()
        console.error('User already exist')
        // return response500WithMessage(res, 'Les champs sont mal rempli');
      }
    })
      .catch((error) => {
        return console.error('ERRRRRROR', error)
      })
  }
  else {
    return console.error('Les champs sont mal remplis')
    // return response500WithMessage(res, 'Les champs sont mal rempli');
  }
}

function insertNewUserInDb({ user, passwordHashed}) {
  return (
    db('users')
      .insert({
        first_name: user.body.name,
        email: user.body.email,
        password: passwordHashed,
        created_on: new Date()
      })
      .returning(['*'])
      .then((user) => {
        const a = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        })
        // res.status().send()
        // res.json(user, a)
        // console.log(user, 'New User Create')
        return a
      })
  )
}

function userIsInDB({ user }) {
  console.log('user.email', user.email)
  return (
    db('users')
      .select('*')
      .where('email', '=', user.email)
      .first()
      .then((x) => { return x })
  )
}

export default {
  createNewUser,
  userIsInDB
}