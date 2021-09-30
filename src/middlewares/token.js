import jwt from 'jsonwebtoken'

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToker = bearer[1]

    req.token = bearerToker
    return true
  } else {
    console.log('undefined')
    return res.status(403).json({ messsage: 'token is undefined or acces unauthorize' })
  }
}

function decodedToken(req, res, next) {
  const x = verifyToken(req, res, next)
  const decoded = jwt.verify(req.token, process.env.JWT_SECRET_KEY)
  if (x === true && decoded) {
    let userId = decoded.user.id
    req.currentUserId = { userId: userId }
    next()
  }
  else {
    console.log('non')
    return res.sendStatus(400)
  }
}

export default {
  verifyToken,
  decodedToken
}
