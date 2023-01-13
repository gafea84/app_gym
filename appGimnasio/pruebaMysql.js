const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlpassword',
    port: 3306,
    database: 'gimnasio'
});

conn.connect((err) => {
    // conn.query('select * from clientes', (err, result) => {
    //     console.log(err);
    //     console.log(result.length);
    // });

    const clientId = 90;
    const name = 'Peta';

    // conn.query('select * from clientes where nombre = ?', [name], (err, result) => {
    //     console.log(err);
    //     console.log(result);
    // });

    conn.query(
        'insert into profesores (nombre, experiencia) values (?, ?)',
        ['Rosa', 21],
        (err, result) => {
            console.log(err);
            console.log(result);
        }
    );
});