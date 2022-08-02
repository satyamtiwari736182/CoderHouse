const crypto = require('crypto')
class HashService {
    async hashOtp(data) {
        const hashOtp = await crypto.createHmac('sha256', process.env.HASH_SECRET).update(data).digest('hex')
        return hashOtp;
    }
}
module.exports = new HashService();