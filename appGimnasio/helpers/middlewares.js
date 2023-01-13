const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const checkToken = (req, res, next) => {
    // Comprobar si el token viene incluido en la cabecera
    if (!req.headers['authorization']) {
        return res.status(401)
            .json({ fatal: 'Debes incluir el token de autenticación' });
    }

    const { authorization: token } = req.headers;

    // Comprobar si el token es válido
    let obj;
    try {
        obj = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        console.log(error);
        return res.status(401)
            .json({ fatal: 'El token incluido no es válido' });
    }

    // Comprobar la expiración del token
    if (obj.expiration_date < dayjs().unix()) {
        return res.status(401)
            .json({ fatal: 'El token está caducado' });
    }

    next();
}

// TODO: CheckRole

module.exports = {
    checkToken
}