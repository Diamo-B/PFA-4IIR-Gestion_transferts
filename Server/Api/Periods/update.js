const { parseISO, isValid } = require("date-fns");
const prisma = require("../../prisma/prismaInstance");

const update = async (req, res) => {
  const { label, startDate, endDate, price, id } = req.body;
  
  const parsedStartDate = parseISO(startDate);
  const parsedEndDate = parseISO(endDate);

  try {
    let updatedPeriod = await prisma.period.update({
      where:{
        id:id
      },
      data:{
        label: label,
        start: parsedStartDate,
        end: parsedEndDate,
        price: price,
      }
    });
    return res.status(200).json(updatedPeriod);
  } catch (err) {
    console.log(err);
    if(err.code === "P2002"){
      return res.status(400).json({message:"There's already a period with the same label"});
    }
    return res.status(500).json({error:"An unknown error has occured"});
  }
};

module.exports = { update };
