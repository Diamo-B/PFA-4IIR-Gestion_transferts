const prisma = require("../../prisma/prismaInstance");

let removeAuthorisation = async (req,res) => {
    let {authName} = req.body;
    try {
        let authorisation = await prisma.authorisation.delete({
            where:{
                name: authName
            }
        })
        return res.status(200).json({authorisation,status: "done"});
    } catch (err) {
        return err.code == "P2025"?
            res.status(500).json({
                code: "auth_not_found",
                message: "The authorisation '"+authName+"' was not found!!"
            })
        :
            res.status(500).json(err)
    }   
}

module.exports = {
    removeAuthorisation
}