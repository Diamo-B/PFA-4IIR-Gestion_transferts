const jwt = require('jsonwebtoken');

const requireAuthSuperAgent = (req,res,next) => {
    let token = req.header('Authorization')?.replace('Bearer ', '');
    
    if(token)
    {
        jwt.verify(token,process.env.JWT_SECRET, (err, decodedToken) => {
            if (!err) {
                if(decodedToken.agent.isSuperAdmin == true)
                {
                    // Correct SuperAgent token
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

module.exports = {requireAuthSuperAgent}