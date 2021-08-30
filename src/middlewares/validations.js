//Function to validate User informations
const verificationEmail = /\S+@\S+\.\S+/;

function validUserInformations(user) {
  const hasName = typeof user.name === 'string' && user.name.trim() != '' && user.name.length >= 3;
  const hasEmail =
    typeof user.email === 'string' && user.email.trim() != '' && verificationEmail.test(user.email);
  const hasPassword = typeof user.password === 'string' && user.password.trim() != '';
  return hasName && hasEmail && hasPassword;
}

export default {
  validUserInformations,
}
