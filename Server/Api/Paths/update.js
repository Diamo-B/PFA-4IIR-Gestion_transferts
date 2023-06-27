const prisma = require("../../prisma/prismaInstance");

let update = async (req, res) => {
    let { id, newData } = req.body;
    
    let query = newData.active !== undefined ? newData : {
        departure: {
          connect: {
            id: newData.Departure
          }
        },
        arrival: {
          connect: {
            id: newData.Arrival
          }
        },
        distance: parseFloat(newData.Distance),
        price: parseFloat(newData.Price)
    }

    try {
      let updatedRecord = await prisma.transferPath.update({
        where: {
          id: id
        },
        data: query
      });
      if (updatedRecord === null) {
        return res.status(400).json({
          err: "There is no path with the provided ID"
        });
      }
      return res.status(200).json(updatedRecord);
    } catch (err) {
      return res.status(500).json(err);
    }
  };
  
  module.exports = { update };
  