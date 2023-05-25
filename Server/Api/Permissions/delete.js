const prisma = require("../../prisma/prismaInstance");

const deletePermissions = async (req,res) => {
    let {permissionName} = req.body;
    try {
        let deletedPermission = await prisma.permission.delete({
            where:{
                value: permissionName
            }
        })
        return res.status(200).json(deletedPermission)
    } catch (err) {
        if(err.code == "P2025")
        {
            return res.status(400).json({err:`There is no permission with the name of ${permissionName}`})
        }
    }

}

module.exports = {
    deletePermissions
}

