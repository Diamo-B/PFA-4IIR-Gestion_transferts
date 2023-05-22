const prisma = require("../../prisma/prismaInstance");

let removeMany = async (req,res) => {
    let {IDs} = req.body;
    if(IDs.length === 0)
        return res.status(400).json({err: "You need to pass at least one ID to this API"});
    
    try {
        let deleted = await prisma.place.deleteMany({
            where:{
                id :{
                    in: IDs
                }
            }
        })
        res.status(200).json({ count: deleted.count });

    } catch (err) {
        res.status(500).json({ error: 'An error occurred while deleting records', details: err.message });
    }
}

module.exports = { removeMany }