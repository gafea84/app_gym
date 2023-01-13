const { validationResult } = require('express-validator');

const nuevoCliente = {
    nombre: {
        exists: true,
        errorMessage: 'El campo nombre es requerido'
    },
    email: {
        exists: {
            errorMessage: 'El email es obligatorio'
        },
        isEmail: {
            errorMessage: 'El campo email debe ser válido'
        },
    },
    apellidos: {
        isLength: {
            options: { max: 10 },
            errorMessage: 'El campo apellidos debe tener como máximo 10 caracteres'
        }
    },
    edad: {
        custom: {
            options: (value) => {
                return value >= 18 && value <= 65;
            },
            errorMessage: 'La edad debe estar entre 18 y 65'
        }
    }
}

const checkError = (req, res, next) => {
    // Comprobamos los errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    next();
}

module.exports = {
    nuevoCliente, checkError
}