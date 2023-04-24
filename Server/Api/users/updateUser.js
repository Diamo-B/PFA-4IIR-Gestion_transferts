const prisma = require("../../prisma/prismaInstance");

let updateUser = async (req,res) => {
  let {email, newMail, firstName, lastName, password} = req.body;
  try {
    let updatedUser = await prisma.user.update({
      where: {
        email: email
      },
      data:{
        email: newMail,
        firstName: firstName,
        lastName: lastName,
        password: password
      }
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