const prisma= require("../../prisma/prismaInstance");

let update = async (req,res) => {
    let {id,newName} = req.body;

    try {
        let updatedModel = await prisma.model.update({
            where:{
                id: id
            },
            data:{
                label:newName
            }
        });
        return res.status(200).json(updatedModel);
    } catch (err) {
        if(err.code == "P2025")
            return res.status(400).json({err: "The requested model was not found"});
        return res.status(500).json(err);
    }
}

module.exports = {update}