const prisma = require("../../prisma/prismaInstance")

let levels = [
    "read",
    "write",
    "add",
    "remove"
]

let createAuthorisation = async (req,res) => {
    let {name, level} = req.body;
    if(!levels.includes(level.toLowerCase()))
    {
        return res.status(500).json({
            code: "invalid_level",
            err: "Invalid level of authorisation: The levels are ["+levels+"]"})
    }
    try {
        let authorisation = await prisma.authorisation.create({
            data:{
                name,
                level
            }
        })
        return res.status(200).json({authorisation})
    } catch (err) {
        return  err.code == "P2002"?
            res.status(500).json({
                code:"duplicate_name",
                message:"duplicate authorisation name"
            }) 
            : 
            res.status(500).json(err)
        ;
    }
}

module.exports = {
  createAuthorisation
}