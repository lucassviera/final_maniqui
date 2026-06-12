// Ejemplo conceptual para MySQL (usando mysql2)
const mysql = require('mysql2');

// Creamos la conexión con los datos de tu PC
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Tu usuario de DB (suele ser root)
  password: '',       // Tu contraseña de DB
  database: 'fabrica_maniquies' // El nombre que le diste en tu .sql
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ' + err.stack);
    return;
  }
  console.log('¡Conectado exitosamente a la base de datos fabrica_maniqui!');
});

module.exports = connection;