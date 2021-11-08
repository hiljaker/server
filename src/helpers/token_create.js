const jwt = require('jsonwebtoken');

module.exports = {
    createAuthToken: (data) => {
        const key = "carti"
        const token = jwt.sign(data, key, { expiresIn: "10m" })
        return token
    },
    createVerificationToken: (data) => {
        const key = "baton"
        const token = jwt.sign(data, key, { expiresIn: "600s" })
        return token
    }
};
