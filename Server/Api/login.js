const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prismaInstance");
let bcrypt = require('bcrypt');

let login = async (req,res) => {
    let {email, password} = req.body;
    try {
    
        let user = await prisma.user.findFirst({
            where:{
                email: email
            },
            include:{
                agent: true,
                client: true
            }
        })
        if(!user)
            throw "user_not_found"
        else
        {
            if(await bcrypt.compare(password, user.password))
            {
                let token = jwt.sign(user,process.env.JWT_SECRET,{
                    expiresIn:"1d"
                });
                return res.status(200).json({token, type: user.client === null ? "agent" : "client"});
            }
            else
                throw "password_incorrect"
        }
    } catch (err) {
        return res.status(500).json({err:err})
    }    
}

module.exports = {login}