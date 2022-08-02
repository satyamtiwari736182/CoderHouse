const hashService = require('./hash-service')
const crypto = require('crypto')
const smsSid = process.env.SMS_SID
const smsAuthToken = process.env.SMS_AUTH_TOKEN

const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true
})

class OtpService {

    async generateOtp() {
        return await crypto.randomInt(1000, 9999)
    }

    async sendBySms(phone, otp) {
        return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your CodersHouse OTP is ${otp}`
        })
    }

    async verifyOtp(hashedOtp, data) {
        const computedHash = await hashService.hashOtp(data);
        return hashedOtp === computedHash
    }

}
module.exports = new OtpService()