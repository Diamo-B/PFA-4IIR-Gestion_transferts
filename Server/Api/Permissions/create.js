const prisma = require('../../prisma/prismaInstance');

let create = async (req,res) => {
    let {value} = req.body;
    try {
        let permission = await prisma.permission.create({
            data:{
                value
            }
        });
        return res.status(200).json(permission);
    } catch (err) {
        return res.status(500).json(err);
    }

}

module.exports = {create}