const prisma = require('../../prisma/prismaInstance')
const {verify} =  require('jsonwebtoken');

const getByClientID = async (req, res) => {
    let token = req.header('Authorization')?.split(' ')[1];
    try{
        if(token)
        {
            verify(token,process.env.JWT_SECRET,(err,decodedToken)=>{
                if(!err)
                {
                    //TODO: Get ALL THE RESERVATIONS OF THE CLIENT USING (decodedToken.client.userId)
                    return res.status(200).json(decodedToken.client.userId)
                }
                else
                {
                    throw 'Error Extracting ClientId from the Token. Contact the Super Admin';
                }
            })
        }
        else
        {
            throw 'Error Extracting ClientId from the Token. Contact the Super Admin';
        }

    }catch(err){
        console.log(err)
        return res.status(500).json("Server Error")
    }

}

module.exports = { getByClientID }