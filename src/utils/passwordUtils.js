import bcrypt from 'bcrypt'

function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

function comparePassword(password, { user }) {
  return bcrypt.compare(password, user.password)
}

export default {
  hashPassword,
  comparePassword
}