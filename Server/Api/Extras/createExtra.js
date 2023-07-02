const prisma = require("../../prisma/prismaInstance");

const createExtra = async (req, res) => {
    let {label, price, extraTypeId, params} = req.body;
    try {
        let extra = await prisma.extra.create({
            data:{
                label,
                price,
                params: params ? params : undefined,
                type:{
                    connect:{
                        id:extraTypeId
                    }
                }
            },
            include:{
                type:true
            }
        });
        
        return res.status(200).json(extra);
    }catch (error) {
        if(error.code === "P2002")
            return res.status(400).json({message:"An extra with the name {"+label+"} already exists"});
        return res.status(500).json(error);
    }
}

module.exports = createExtra;