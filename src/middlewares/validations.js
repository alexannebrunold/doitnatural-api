// //Function to validate post Book
// function validBook(book) {
//   const hasTitle = typeof book.title === 'string' && book.title.trim() != '';
//   const hasAuthor = typeof book.author === 'string' && book.author.trim() != '';
//   return hasTitle && hasAuthor;
// }

//Function to validate User
const verificationEmail = /\S+@\S+\.\S+/;
function validUser(user) {
  const hasName = typeof user.name === 'string' && user.name.trim() != '' && user.name.length >= 3;
  const hasEmail =
    typeof user.email === 'string' && user.email.trim() != '' && verificationEmail.test(user.email);
  const hasPassword = typeof user.password === 'string' && user.password.trim() != '';
  return hasName && hasEmail && hasPassword;
}

export default {
  // validBook,
  validUser,
}
