import validUser from '../middlewares/validations.js'
import db from '../config/dbConnection.js'
import jwt from 'jsonwebtoken'
import passwordUtils from '../utils/passwordUtils.js'

function createNewUser(req, res, next) {
  if (validUser.validUserInformations(req.body)) {
    userIsInDB({ user: req.body }).then((user) => {
      if (user === undefined) {
        passwordUtils.hashPassword(req.body.password).then((passwordHashed) => {
          insertNewUserInDb({ user: req, passwordHashed })
            .then((token) => {
              res.status(200).json({ token: token })
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

function insertNewUserInDb({ user, passwordHashed }) {
  return (
    db('users')
      .insert({
        first_name: user.body.first_name,
        email: user.body.email,
        password: passwordHashed,
        created_on: new Date()
      })
      .returning(['*'])
      .catch((error) => {
        console.log(error)
      })
  )
}

function userIsInDB({ user }) {
  return (
    db('users')
      .select('*')
      .where('email', '=', user.email)
      .first()
  )
}

function userConnexion(req, res, next) {
  userIsInDB({ user: req.body })
    .then((user) => {
      if (user) {
        return passwordUtils
          .comparePassword(req.body.password, { user: user })
          .then((isPasswordTheSame) => {
            if (!isPasswordTheSame) {
              res.status(401).json({
                error: 'Unauthorized Access!',
              })
            } else {
              const token = jwt.sign(
                { id: user.id, user },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '3000s' } //86400
              )

              return res.status(200).send({
                id: user.id,
                first_name: user.first_name,
                email: user.email,
                accessToken: token,
              })
            }
          })
      } else {
        next(new Error('Invalid Loggin'))
      }
    })
    .catch((err) => {
      return res.json({ status: 401, message: err + 'Message derreur', data: null })
    })
}



export default {
  createNewUser,
  userIsInDB,
  userConnexion
}