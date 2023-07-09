const prisma = require("../../prisma/prismaInstance");
const getByID = async (req, res) => {
  let resId = req.params.ID;
  try{
    let reservation = await prisma.reservation.findUnique({
      where: {
        id: resId,
      },
      include: {
        client: {
          include: {
            user: true,
          },
        },
        extras: true,
        Vehicles: true,
        period: true,
        transferPath: true,
      },
    });
    if (!reservation) return res.status(404).json("No reservation was found");
    else return res.status(200).json(reservation);
  }catch(err){
    console.log(err)
    return res.status(500).json("Server Error")
  }
};
module.exports = { getByID };
