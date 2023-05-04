const prisma = require("../../prisma/prismaInstance");

let removeUsers = async (req,res) => {
    let emails = req.body.emails;
    try {
        let users = await prisma.user.deleteMany({
          where:{
            email:{
                in:emails
            }
          }
        })
        return res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
}

module.exports={
  removeUsers
}