/*
    ?  Returns a user based on the given term
    => Searching Criterias: firstName, lastName and Email
    *  Method: GET
*/
const prisma = require("../../prisma/prismaInstance");

let getByTerm = async (req,res) => {
    let term = req.params.term;
    try {
        let users = await prisma.user.findMany({
            where:{
                OR:[
                    {firstName:{contains: term}},
                    {lastName: {contains: term}},
                    {email: { contains: term}}
                ]
            },
            include:{
                agent: true,
                client: true
            }
        });

        return res.status(200).json(users);
        
    } catch (err) {
        return res.status(500).json(err);    
    }
}

module.exports = {getByTerm}