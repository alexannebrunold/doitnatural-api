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