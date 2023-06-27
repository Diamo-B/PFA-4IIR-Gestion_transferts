const prisma = require("../../prisma/prismaInstance");

const update = async (req, res) => {
    let { id, subBrand, brand, places, lux, Status } = req.body;
    const updatedData = {};
    subBrand && (updatedData.sub_Brand = subBrand );
    brand && (updatedData.brand = brand );
    places && (updatedData.places = places );
    lux != undefined && (updatedData.lux = lux );  
    Status != undefined && (updatedData.Status = Status );
    console.log(updatedData.Status);
    try {
        let updatedVehicule = await prisma.vehicule.update({
            where: {
                id: id
            },
            data: updatedData
        });
        return res.status(200).json({updatedVehicule});
    } catch (err) {
        console.error(err);
        return res.status(500).json({err});
    }
}

module.exports = {update};