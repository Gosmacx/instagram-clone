import jwt from 'jsonwebtoken'

export default ({ id, username, password }) => {
    return jwt.sign({ id, username, password }, process.env.secretKey, { expiresIn: '24h' });
}