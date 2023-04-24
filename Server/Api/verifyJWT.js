const jwt =  require('jsonwebtoken');

let verifyJWT = (req,res) => {
    try {
        let token = req.header('Authorization')?.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken)=>{
            if(!err)
            {
                return res.status(200).json(decodedToken);
            }
            else
            {
                throw 'Unauthorized';
            }
        })
    }
    catch (err) {
        return res.status(401).json({err:err});
    }
}

module.exports = {verifyJWT}