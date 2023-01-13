const router = require('express').Router();
const dayjs = require('dayjs');

const { getAll, create, getById, update, deleteById } = require('../models/cliente.model');

router.get('/', async (req, res) => {
    const clientes = await getAll();
    res.render('clients/list', {
        clientes
    });
});

router.get('/new', (req, res) => {
    res.render('clients/form');
});

router.get('/edit/:clientId', async (req, res) => {
    const { clientId } = req.params;

    const cliente = await getById(clientId);
    // Format de la fecha para que cuadre con el campo input-date
    console.log(cliente.fecha_nacimiento)
    cliente.fecha_nacimiento = dayjs(cliente.fecha_nacimiento).format('YYYY-MM-DD');
    console.log(cliente.fecha_nacimiento)

    res.render('clients/formEdit', {
        cliente
    })
});

router.get('/delete/:clientId', async (req, res) => {
    const { clientId } = req.params;

    const result = await deleteById(clientId);

    res.redirect('/clients');
})


router.post('/create', async (req, res) => {
    const result = await create(req.body);
    res.redirect('/clients');
});

router.post('/update', async (req, res) => {
    const { clientId } = req.body;

    const result = await update(clientId, req.body);

    res.redirect('/clients');
});

module.exports = router;