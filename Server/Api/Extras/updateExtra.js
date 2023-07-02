const prisma = require("../../prisma/prismaInstance");

const updateExtra = async (req, res) => {
    let {id, label, params, price, active, extraTypeId} = req.body;
    try {
        let updatedExtra = await prisma.extra.update({
            where:{
                id
            },
            data:{
                label: label ? label : undefined,
                params: params ? params : undefined,
                price: price ? price : undefined,
                active: active !== undefined && active !== null ? active : undefined,
                type: extraTypeId ? {
                    connect:{
                        id:extraTypeId
                    }
                }: undefined
            },
            include:{
                type: true
            }
        });
        return res.status(200).json(updatedExtra);
    }catch (error) {
        return res.status(500).json(error);
    }           
}

module.exports = updateExtra;