// Librería con los métodos para interactuar con la tabla clientes
const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery('select * from clientes');
}

const getByPage = (page, limit) => {
    return executeQuery('select * from clientes limit ? offset ?', [limit, (page - 1) * limit]);
}

const getActives = () => {
    return executeQuery('select * from clientes where edad >= 18 and edad <= 65');
}

const getById = (clientId) => {
    return executeQueryOne('select * from clientes where id = ?', [clientId]);
}

const create = ({ nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni }) => {
    return executeQuery('insert into clientes (nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni]);
}

const deleteById = (clientId) => {
    return executeQuery('delete from clientes where id = ?', [clientId]);
}

const update = (clientId, { nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni }) => {
    return executeQuery('update clientes set nombre = ?, apellidos = ?, direccion = ?, email = ?, edad = ?, genero = ?, cuota = ?, fecha_nacimiento = ?, dni = ? where id = ?', [nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni, clientId]);
}

module.exports = {
    getAll, getByPage, getActives, getById, create, deleteById, update
}