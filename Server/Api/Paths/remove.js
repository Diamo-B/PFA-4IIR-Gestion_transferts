const prisma = require("../../prisma/prismaInstance");

let remove = async (req,res) => {
    let {id} = req.body;
    try
    {
        let deletedRecord = await prisma.transferPath.delete({
            where:{
                id:id
            },
            include:{
                departure: true,
                arrival:true
            }
        })
        return res.status(200).json(deletedRecord);
    }
    catch(err)
    {
        return err.code === "P2025"
        ?
         res.status(500).json({err: err.meta.cause})
        :
         res.status(500).json(err);
    }

}

module.exports = {remove}