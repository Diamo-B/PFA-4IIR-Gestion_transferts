const prisma = require("../../prisma/prismaInstance");

let removeUser = async (req,res) => {
    let email = req.body.email;
    try {
        let userD = await prisma.user.delete({
          where:{
            email: email
          }
        })
        return res.status(200).json(userD);

    } catch (err) {
      return err.code == "P2025" ? 
      res.status(500).json({code: "notFound",message: "There is no user with the email '"+email+"'"})
      :
      res.status(500).json(err);
    }
}

module.exports={
  removeUser
}