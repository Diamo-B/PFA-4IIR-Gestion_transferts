const prisma = require("../../prisma/prismaInstance");

let getAll = async (req,res) => {
    try {
        let permissions = await prisma.permission.findMany({});
        return res.status(200).json(permissions);
    } catch (err) {
        return res.status(400).json(err);
    }
    
}

module.exports = {
    getAll
}