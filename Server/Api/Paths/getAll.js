const prisma = require('../../prisma/prismaInstance');

let getAll = async (req,res) => {
    try {
        let paths = await prisma.transferPath.findMany({
            include:{
                departure:{
                    select:{
                        name: true,
                        longitude: true,
                        latitude: true
                    }
                },
                arrival:{
                    select:{
                        name: true,
                        longitude: true,
                        latitude: true
                    }
                },
            }
        });
        if(paths.length <= 0)
        {
            throw {err: "No paths were found"}
        }
        return res.status(200).json(paths);
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    getAll
}