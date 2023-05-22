const prisma = require("../../prisma/prismaInstance");

let remove = async (req,res) => {
    let {id} = req.body;
    if(!id)
        return res.status(400).json({err: "Please provide the ID to remove"})
    try 
    {
        let deletedRecord = await prisma.place.delete({
            where:{
                id: id    
            }
        })

        return res.status(200).json(deletedRecord);
    }
    catch(err)
    {
        return err.code === "P2025"?
            res.status(400).json({err: "The place with the ID "+id+" was not found!"}) 
        :
            res.status(500).json(err);
    }
}

module.exports = {remove}