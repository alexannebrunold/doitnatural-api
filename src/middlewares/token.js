import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js'

export default function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToker = bearer[1]

    req.token = bearerToker
    next()
  } else {
    console.log('undefined')
    return res.status(403)
  }
}

// export default async function verifyToken  (req, res, next) {
//   // console.log(req.body, req.headers.authorization.split(' ')[1]);
//   const token = req.headers.authorization.split(' ')[1]
//   const decodedToken = await jwt.verify(token, config.secret)
//   console.log(decodedToken);
//   const userId = decodedToken.userId


//   if (req.body.userId && req.body.userId !== userId) {
//     throw 'Invalid user ID'
//   } else {
//     // next()
//     console.log('coucou');
//   }
// //  .catch {
// //   res.status(401).json({
// //     error: new Error('Invalid request!')
// //   })
// }

// export default function verifyToken(req, res, next) {
//   console.log(req.headers.authorization, config.secret);
//   try {
//     const token = req.headers.authorization.split(' ')[1]
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
//     const userId = decodedToken.userId

//     console.log(decodedToken, userId)

//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid user ID'
//     } else {
//       console.log('heyyyy')
//       next()
//     }
//   }
//   catch {
//     res.status(401).json({
//       error: new Error('Invalid request!')
//     })
//   }
// }

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1]
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
//     const userId = decodedToken.userId
  //   if (req.body.userId && req.body.userId !== userId) {
  //     throw 'Invalid user ID'
  //   } else {
  //     next()
  //   }
  // } catch {
  //   res.status(401).json({
  //     error: new Error('Invalid request!')
  //   })
  // }
// }