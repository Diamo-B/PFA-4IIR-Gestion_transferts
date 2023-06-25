const prisma = require("../../prisma/prismaInstance");
let removeMany = async (req, res) => {
    let {Ids} = req.body;
    try {
        let removedVehicles = await prisma.vehicule.deleteMany({
            where:{
                id:{
                    in:Ids
                }
            }
        });
        return res.status(200).json({removedVehicles});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports = removeMany;