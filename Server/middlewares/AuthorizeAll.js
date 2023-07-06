const jwt = require('jsonwebtoken');

const requireGeneralAuth = (req,res,next) => {
    let token = req.header('Authorization')?.replace('Bearer ', '');
    
    if(token)
    {
        jwt.verify(token,process.env.JWT_SECRET, (err, decodedToken) => {
            if (!err) {
                if(decodedToken != null)
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

module.exports = {requireGeneralAuth}