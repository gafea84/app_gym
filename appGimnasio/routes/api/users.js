const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { createToken } = require('../../helpers/utils');
const { register, getByEmail } = require('../../models/usuario.model');

router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8);

        const result = await register(req.body);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});







router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el email existe
    const user = await getByEmail(email);
    if (!user) {
        return res.json({ fatal: 'Error en email y/o contraseña1' })
    }

    // Comprobar si las password coinciden
    const iguales = bcrypt.compareSync(password, user.password);
    if (!iguales) {
        return res.json({ fatal: 'Error en email y/o contraseña2' })
    }

    res.json({
        success: true,
        token: createToken(user)
    });
});











module.exports = router;