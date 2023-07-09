const prisma = require('../../prisma/prismaInstance')
const remove = async (req, res) => {

    return res.status(200).json("remove")
}
module.exports = { remove }