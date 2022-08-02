const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
    try {
        const { accesstoken } = req.cookies;
        if (!accesstoken)
            throw new Error();
        // console.log(accesstoken)

        const userData = await tokenService.verifyAccessToken(accesstoken)
        // console.log(userData)
        if (!userData)
            throw new Error();
        console.log('Hayeeeeeee', userData)
        req.user = userData;
        next();

    } catch (err) {
        console.log(err)
        res.status(401).json({ message: 'Invalid Token' })
    }

}