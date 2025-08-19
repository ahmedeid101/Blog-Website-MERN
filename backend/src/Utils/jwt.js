require('dotenv').config();
const jwt = require('jsonwebtoken');

class JWT {
    constructor(){
        this.secret = process.env.JWT_SECRET;
        this.expiresIn  = process.env.JWT_EXPIRES_IN || '3h';

<<<<<<< HEAD
          //Verify JWT_SECRET exists
=======
          // Verify JWT_SECRET exists
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET must be defined in environment variables');
        }
    }

    generateToken(payload){
        return jwt.sign(payload, this.secret, {expiresIn: this.expiresIn});
    }

    verifyToken(token){
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    decodeToken(token){
        return jwt.decode(token);
    }
}

module.exports = JWT;