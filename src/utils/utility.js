import jwt from 'jsonwebtoken';

export default  function jsonwebtoken(userId){
    const payload={id: userId}
    const secret= process.env.JWT_SECRET
    const options= { expiresIn: '1h' };
    return jwt.sign(payload, secret, options);

}