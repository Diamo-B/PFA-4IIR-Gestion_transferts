const jwt = require('jsonwebtoken');

const requireAuthAgent = (req,res,next) => {
    // Retrieve token from Authorization header or from cookies;
    let token = req.header('Authorization')?.replace('Bearer ', '');
    if(token)
    {
        jwt.verify(token,process.env.JWT_SECRET, (err, decodedToken) => {
            if (!err) {
                if(decodedToken.agent != null)
                {
                    // Correct agent token
                    next();
                }
                else
                {
                    // Correct token but doesn't belong to an agent
                    return res.status(401).json({ message: 'Unauthorized' });
                };
            }
            else
            {
                // Incorrect token
                return res.status(401).json({ message: 'Unauthorized' });
            }
        })
    }
    else
    {
        // No token found, send error response
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {requireAuthAgent}