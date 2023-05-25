const prisma = require("../../prisma/prismaInstance");

let update = async (req,res) => {
    let {permissionName, newPermissionName} = req.body;
    try {

        let updatedPermission = await prisma.permission.update({
            where:{
                value: permissionName
            },
            data:{
                value: newPermissionName
            }
        })
        return res.status(200).json(updatedPermission);
    } catch (err) {
        if(err.code === "P2025")
            return res.status(400).json({err: `There is no record with the name ${permissionName}`})
        return res.status(500).json(err);
    }
}

module.exports = {update}