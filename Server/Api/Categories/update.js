const prisma = require('../../prisma/prismaInstance');

let update = async (req,res) => {
    let {categoryName, newCategoryName} = req.body;
    try {
        let category = await prisma.category.update({
            data:{
                name: newCategoryName
            },
            where:{
                name: categoryName
            }
        });
        return res.status(200).json(category);
    } catch (err) {
        if(err.code == "P2025")
            return res.status(400).json({err: `There is no category with the name of ${categoryName}`})
        return res.status(500).json(err);
    }
}

module.exports = {update}