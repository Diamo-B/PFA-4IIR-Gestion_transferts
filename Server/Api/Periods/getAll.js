const { format } = require('date-fns');
const prisma = require('../../prisma/prismaInstance');

let getAll = async (req, res) => {
    try {
        let periods = await prisma.period.findMany({});
        periods.forEach(period => {
            period.start = format(period.start, 'dd-MM-yyyy');
            period.end = format(period.end, 'dd-MM-yyyy');
        });
        return res.status(200).json(periods);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {getAll};