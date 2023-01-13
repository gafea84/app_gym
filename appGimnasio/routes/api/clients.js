const router = require('express').Router();
const { body/*, params, query*/, validationResult, checkSchema } = require('express-validator');

const { getAll, getByPage, getActives, getById, create, deleteById, update } = require('../../models/cliente.model');
const { nuevoCliente, checkError } = require('../../helpers/validators');

// router.get('/', (req, res) => {
//     const { page = 1, limit = 10 } = req.query;
//     // console.log(page + limit);

//     getAll()
//         .then(clientes => res.json(clientes))
//         .catch(error => res.json({ fatal: error.message }));

// });

// localhost:3000/api/clients?page=20&limit=20
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;


    try {
        const clientes = await getByPage(parseInt(page), parseInt(limit));
        res.json(clientes);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/actives', async (req, res) => {
    try {
        const clientes = await getActives();
        res.json(clientes);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/:clientId', async (req, res) => {
    const { clientId } = req.params;

    const cliente = await getById(clientId);

    if (cliente) {
        res.json(cliente);
    } else {
        res.json({ error: 'No existe un cliente con ese ID' });
    }
});













router.post('/',
    // body('nombre')
    //     .exists().withMessage('El campo nombre es requerido'),
    // body('email')
    //     .exists().withMessage('El email es requerido')
    //     // .isEmail().withMessage('El email debe ser válido'),
    //     .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage('El email debe ser válido'),
    // body('apellidos')
    //     .isLength({ max: 10 }).withMessage('Los apellidos no pueden tener más de 10 caracteres'),
    // body('edad')
    //     .custom((value) => {
    //         return value >= 18 && value <= 65;
    //     }).withMessage('La edad debe estar entre 18 y 65 años')
    checkSchema(nuevoCliente),
    checkError
    , async (req, res) => {
        try {
            const result = await create(req.body);
            const cliente = await getById(result.insertId);
            res.json(cliente);
        } catch (error) {
            res.json({ fatal: error.message });
        }
    });












router.put('/:clientId', async (req, res) => {
    const { clientId } = req.params;

    const result = await update(clientId, req.body);

    res.json(result);
});














router.delete('/:clientId', async (req, res) => {
    const { clientId } = req.params;

    const result = await deleteById(clientId);

    res.json(result);
});

module.exports = router;






// /api/documents/curriculum/ext/doc
// /api/documents/curriculum/ext/pdf
// /api/documents/menu/ext/doc
// /api/documents/circular/ext/csv
// router.get('/api/documents/:name/ext/:extension', (req, res) => {
//     // const name = req.params.name;
//     // const extension = req.params.extension;
//     const { name, extension } = req.params;

// })

// /api/documents/curriculum.doc
// /api/documents/curriculum.pdf
// /api/documents/menu.doc
// /api/documents/circular.csv
// router.get('/api/documents/:name.:extension', (req, res) => {
//     const { name, extension } = req.params;

// })

// /api/vuelos/Madrid-Berlin
// /api/vuelos/Barcelona-Londres
// router.get('/api/vuelos/:from-:to', (req, res) => {
//     const { from, to } = req.params;
// });


/**
 *
 * res.send, res.end
 * res.json
 * res.render, res.redirect
 * res.download
 *
 */

