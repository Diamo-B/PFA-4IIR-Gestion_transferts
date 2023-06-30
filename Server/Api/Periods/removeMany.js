const prisma = require('../../prisma/prismaInstance');
const removeMany = async (req,res)=>{
    let {ids} = req.body;
    try{
        let deletedPeriods = await prisma.period.deleteMany({
            where:{
                id:{
                    in:ids
                }
            }
        })
        return res.status(200).json({message:"The selected periods were deleted successfully"})
    }catch(e){
        return res.status(500).json({message:"An unknown error has occurred."})
    }
}

module.exports = {removeMany}