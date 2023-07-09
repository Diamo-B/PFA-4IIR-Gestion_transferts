const prisma = require('../../prisma/prismaInstance')
const removeMany = async (req, res) => {

    return res.status(200).json("removeMany")
}
module.exports = { removeMany }