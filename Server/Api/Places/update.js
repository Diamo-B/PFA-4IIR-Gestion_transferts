const prisma = require("../../prisma/prismaInstance");

let update = async (req, res) => {
    let { id, name, longitude, latitude } = req.body;
    if (!id)
        return res
            .status(400)
            .json({ err: "The ID can't be undefined or null" });


    if (isNaN(longitude) && longitude!==undefined ) {
        return res
            .status(400)
            .json({ err: "The longitude needs to be a valid number" });
    }

    if (isNaN(latitude) && latitude!==undefined ) {
        return res
            .status(400)
            .json({ err: "The latitude needs to be a valid number" });
    }


    let updatedData = {
        name: name ?? undefined,
        longitude: (longitude == undefined || longitude == null)? undefined : parseFloat(longitude),
        latitude: (latitude == undefined || latitude == null)? undefined : parseFloat(latitude),
    };
    try {
        let updatedPlace = await prisma.place.update({
            where: {
                id: id,
            },
            data: updatedData,
        });
        return res.status(200).json(updatedPlace);
    } catch (err) {
        if (err.code === "P2002")
            return res.status(409).json({
                err:
                    "There's already another place with the name of " +
                    name +
                    ". Please choose a unique name",
            });
        else if (err.code === "P2025")
            return res
                .status(404)
                .json({ err: "There's no place with the ID " + id + "." });
        else return res.status(500).json({ err: err });
    }
};

module.exports = { update };
