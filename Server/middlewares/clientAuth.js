const jwt = require("jsonwebtoken");

const requireAuthClient = (req,res,next) => {
    // get token from cookies or authorization header
    let token = req.header('Authorization')?.replace('Bearer', '');

    if(token)
    {
        jwt.verify(token, process.env.secret, (err,decodedToken) => {
            if(err)
            {
                // incorrect or modified token
                return res.status(401).json({ message: 'Unauthorized' });
            }
            else
            {
                if(decodedToken.client != null)
                {
                    // all clear. user is a legit client
                    next();
                }
                else
                {
                    // user is not a client
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            }
        })
    }
    else
        // No token found
        return res.status(401).json({ message: 'Unauthorized' });
}

module.exports = {
    requireAuthClient
}