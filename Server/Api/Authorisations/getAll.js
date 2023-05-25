const prisma = require('../../prisma/prismaInstance');

let getAll = async (req,res) => {
    try {
        let authorisations = await prisma.agentCategoryPermission.findMany({
            include:{
                agent: {
                    include:{
                        user:{
                            select:{
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                                password: false,
                                agent: false,
                                client: false,
                                createdAt: false
                            }
                        }
                    }
                },
                category: true,
                permissions:true
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