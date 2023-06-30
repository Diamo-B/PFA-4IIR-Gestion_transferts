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
            }
        });
        return res.status(200).json(extra);
    }catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = createExtra;