const prisma = require('../../prisma/prismaInstance');

let getAll = async (req,res) => {
    try {
        let authorisations = await prisma.authorisation.findMany({
            include:{
                agents: {
                    include:{
                        user: true
                    }
                }
            }
        })  
        return res.status(200).json(authorisations);
    } catch (err) {
        return res.status(500).json(err);        
    }

}

module.exports = {
    getAll
}