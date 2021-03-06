const jwt = require('jsonwebtoken');

module.exports = {
    verifyAuthToken: (req, res, next) => {
        const token = req.token
        const key = "carti"
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "user unauthorized" })
            }
            req.user = decoded
            next()
        })
    },
    verifyVerificationToken: (req, res, next) => {
        const { token } = req.query
        const key = "baton"
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "user unauthorized" })
            }
            req.user = decoded
            next()
        })
    }
};
