const prisma = require("../../prisma/prismaInstance");
const bcrypt = require('bcrypt');

let hashPassword = async (pass) =>{
  let salt = await bcrypt.genSalt();
  return await bcrypt.hash(pass,salt); 
}

let updateUser = async (req,res) => {
  const { email, newEmail, firstName, lastName, password } = req.body;
  
  const updatedData = {};

  if (newEmail!==null) updatedData.email = newEmail;
  if (firstName!==null) updatedData.firstName = firstName;
  if (lastName!==null) updatedData.lastName = lastName;
  if (password!==null) updatedData.password = await hashPassword(password);
  
  
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