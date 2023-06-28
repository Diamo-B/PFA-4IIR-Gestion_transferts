const prisma = require('../../prisma/prismaInstance');
const { utcToZonedTime, format } = require('date-fns-tz');

let create = async (req, res) => {
    let {startDate, endDate, label, price} = req.body;
    const timeZone = 'Africa/Casablanca';
  
    const start = utcToZonedTime(startDate, timeZone);
    const end = utcToZonedTime(endDate, timeZone);
  
    try {
        let period = await prisma.period.create({
            data: {
                start,
                end,
                label,
                price            
            }
        });
        return res.status(200).json(period);
    } catch (err) {
        if(err.code === "P2002")
            return res.status(400).json({message: `The ${label} period already exists`});
        return res.status(500).json(err);
    }
};

module.exports = { create };