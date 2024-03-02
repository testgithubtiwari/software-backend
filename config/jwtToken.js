const jwt=require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const generateToken = (id) => {
     

    // Define the payload (information you want to include in the token)
    const accessTokenPayload = {
        user: {
            id: id,
        },
        tokenType:'access'
    };

    const refreshTokenPayload = {
        user: {
            id: id,
        },
        tokenType: 'refresh',
    };

    // Define the options (e.g., token expiration time)
    const accessTokenOptions = {
        expiresIn: '5m', // Token will expire in 5 min, you can adjust this as needed
    };

    const refreshTokenOptions = {
        expiresIn: '1h', // Refresh token will expire in 2 hours (adjust as needed)
    };

    // Generate both tokens
    const accessToken = jwt.sign(accessTokenPayload, secretKey, accessTokenOptions);
    const refreshToken = jwt.sign(refreshTokenPayload, secretKey, refreshTokenOptions);

    return { accessToken, refreshToken };
};

module.exports = generateToken;
