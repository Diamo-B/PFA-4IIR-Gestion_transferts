const prisma = require("../../prisma/prismaInstance");
const bcrypt = require('bcrypt');

let hashPassword = async (pass) =>{
  let salt = await bcrypt.genSalt();
  return await bcrypt.hash(pass,salt); 
}

let updateUser = async (req,res) => {
  const { email, newEmail, firstName, lastName, password, banned } = req.body;
  console.log(email, newEmail, firstName, lastName, password, banned);
  const updatedData = {};

  if (newEmail!==null &&  newEmail!==undefined) updatedData.email = newEmail;
  if (firstName!==null &&  firstName!==undefined) updatedData.firstName = firstName;
  if (lastName!==null &&  lastName!==undefined) updatedData.lastName = lastName;
  if (password!==null &&  password!==undefined) updatedData.password = await hashPassword(password);
  if (banned!==null && banned!==undefined) updatedData.banned = banned;
  
  console.log(updatedData);
  try {
    let updatedUser = await prisma.user.update({
      where: {
        email: email
      },
      data:updatedData
    })
    return res.status(200).json(updatedUser)
  } catch (err) {
    return err.code == "P2025" ? 
    res.status(500).json({code: "notFound",message: "There is no user with the email '"+email+"'"})
    :
    res.status(500).json(err);
  }
}

module.exports={
  updateUser
}