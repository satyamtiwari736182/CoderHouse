const otpService = require('../services/otp-service')
const hashService = require('../services/hash-service')
const userService = require('../services/user-service')
const tokenService = require('../services/token-service')
const UserDto = require('../dtos/user-dto')
class AuthController {
    async sendOtp(req, res) {
        //Logic

        const { phone } = req.body;
        //validate the request
        if (!phone) res.satus(400).json({ message: "Phone Field is required" });

        // generate otp
        const otp = await otpService.generateOtp()

        //Hash
        const ttl = 1000 * 60 * 2 //2-min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires})`
        const hash = await hashService.hashOtp(data);

        //send OTP
        try {
            // await otpService.sendBySms(phone, otp)
            res.json({
                otp: otp,
                hash: `${hash}.${expires}`,
                phone
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'message sending failed' })

        }

    }

    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone)
            res.status(400).json({ msg: 'All fields are required' })

        const [hashedOtp, expires] = hash.split('.')
        if (Date.now() > expires)
            res.status(400).json({ message: 'OTP has expired' })

        const data = `${phone}.${otp}.${expires})`

        const isValid = await otpService.verifyOtp(hashedOtp, data)

        console.log('IsValid: ', isValid)
        if (!isValid)
            res.status(400).json({ message: 'Invalid OTP' })

        let user;
        try {
            user = await userService.findUser({ phone: phone });
            if (!user)
                user = await userService.createUser({ phone: phone })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Database Error!' })
        }

        //Token
        const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id, activated: false });

        //Store in database 
        await tokenService.storeRefreshToken(refreshToken, user._id)

        //set cookie
        res.cookie('refreshtoken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accesstoken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });


        const userDto = new UserDto(user)
        res.json({ accessToken, user: userDto, auth: true })
    }

    //-----------------------------------------------------------------------------

    async refresh(req, res) {
        //get refresh token from cookie
        const { refreshtoken: refreshtokenfromcookie } = req.cookies

        //check it's validity
        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(refreshtokenfromcookie)

        } catch (err) {
            res.status(401).json({ message: 'Invalid refreshToken!' })
        }
        console.log("********Satyam******===>", userData);
        //check it in database if not logout

        try {
            const token = await tokenService.findRefreshToken(userData._id, refreshtokenfromcookie)
            if (!token) res.status(401).json({ message: 'Invalid refreshToken!' })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Database Error!' })
        }

        // check if user is valid
        const user = await userService.findUser({ _id: userData._id })
        if (!user)
            res.status(404).json({ message: 'No user found!' })
        //generate new tokens
        const { refreshToken, accessToken } = tokenService.generateTokens({ _id: userData._id })
        //Update refresh token in Db
        try {
            await tokenService.updateRefreshToken(userData._id, refreshToken)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Database Error!' })
        }

        //put it in cookie

        res.cookie('refreshtoken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accesstoken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        //send response
        const userDto = new UserDto(user)
        res.json({ accessToken, user: userDto, auth: true })

    }
    //--------------------------------------------------------------
    async logout(req, res) {
        const { refreshtoken } = req.cookies
        // delete refresh token from Db
        tokenService.removeToken(refreshtoken)
        // delete cookies
        res.clearCookie('refreshtoken')
        res.clearCookie('accesstoken')

        res.json({ user: null, auth: false })

    }
}

module.exports = new AuthController();




