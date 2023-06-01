const prisma = require("../../prisma/prismaInstance");

let removeMany = async (req,res) => {
    let {ids} = req.body;
    try {
        let removedPaths = await prisma.transferPath.deleteMany({
            where:{
                id: {
                    in: ids
                }
            }
        })
        if(removedPaths.count == 0)
        {
            return res.status(400).json({err: "There was a problem when deleting the paths"});
        }
        else
        {
            return res.status(200).json({msg:"Path(s) were deleted successfully"});
        }
    } catch (err) {
        return res.status(400).json(err)
    }
}

module.exports = {removeMany}