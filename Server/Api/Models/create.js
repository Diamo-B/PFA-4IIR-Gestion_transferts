const prisma = require("../../prisma/prismaInstance") 
let create = async (req,res) => {
    let {name} = req.body;

    try {
        let newModel = await prisma.model.create({
            data:{
                label: name
            }
        })
        return res.status(200).json(newModel)
    } catch (err) {
        if(err.code === "P2002")
            return res.status(400).json({err:"There's already an existing model with the name of: "+name})
        return res.status(500).json(err)
    }
}

module.exports = {create}