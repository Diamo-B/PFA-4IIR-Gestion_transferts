const jwt =  require('jsonwebtoken');

let verifyJWT = (req,res) => {
    try {
        let token = req.header('Authorization')?.split(' ')[1];
        if(token)
        {
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
        else
        {
            return res.status(400).json(null);
        }
    }
    catch (err) {
        return res.status(401).json({err:err});
    }
}

module.exports = {verifyJWT}