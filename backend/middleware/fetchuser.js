const jwt = require('jsonwebtoken')
const JWT_SECRET = 'DhruvI$Lucky';

const fetchuser = (req, res, next) => {
    // get the token and append to id 
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please Authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please Authenticate using a valid token" })
    }
}
module.exports = fetchuser;