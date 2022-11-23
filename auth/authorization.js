const jwt = require('jsonwebtoken');

const authorization = function (req, res, next) {
    try {
        const authorization_header = req.get('authorization')
        if (!authorization_header) {
            return res.status(400).json({message: "Missing or invalid token"})
        }
        const decoded_token = jwt.verify(authorization_header, process.env.SECRET)
        if (!decoded_token.id) {
            return res.status(400).json({message: "Missing or invalid token"})
        }
        req.user_identifier = decoded_token.id
        req.user_role = decoded_token.rol
        next()
    } catch (error) {
        return res.status(400).json({status: 400., message: error.message})
    }
}

module.exports = authorization;

