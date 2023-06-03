const prisma = require("../../prisma/prismaInstance");

let remove = async (req,res) => {
    let {id} = req.body;
    try {
        let removedModel = await prisma.model.delete({
            where:{
                id: id
            }
        })
        return res.status(200).json(removedModel)
    } catch (err) {
        if(err.code == "P2025")
            return res.status(400).json({err: "The model you wish to delete does not exist"})
        return res.status(500).json(err)
    }
}

module.exports = {remove}