const prisma = require("../../prisma/prismaInstance");

let getByMail = async (req,res) => {
  let email = req.params.mail;
  try {
    let user = await prisma.user.findUniqueOrThrow({
      where:{
        email: email
      },
      include:{
        agent: true,
        client: true
      }
    })
    return res.status(200).json(user);
  } catch (err) {
    return err.code == "P2025" ? 
    res.status(500).json({code: "notFound",message: "There is no user with the email '"+email+"'"})
    :
    res.status(500).json(err);
  }
}

module.exports = {
  getByMail
}