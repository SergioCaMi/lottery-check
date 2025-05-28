


// Importar el paquete de terceros que acabamos de instalar. Fijaos que como se encuentra en la carpeta node_modules NO hace falta especificar ninguna ruta (al igual que pasa con los built-in modules)
const express = require('express');
const logger = require('morgan');
const fs = require('fs');

// Es generarme un objeto para gestionar el enrutamiento y otros aspectos de la aplicación
const app = express();

// Añadimos el middleware de morgan para loguear todas las peticiones que haga un cliente
app.use(logger('dev'));

// nos gustaría que también gestionaras los datos de tipo JSON (entre ellos los POST que nos lleguen)
app.use(express.urlencoded({ extended: true }));  // Middleware para parsear datos de formularios
const numbers = JSON.parse(fs.readFileSync('./data/lottery.json'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/api/check-date', (req, res) => {
    const datenumber = req.query.date;
    const numberWinner = numbers.find(n => n.draw_date.includes(datenumber));
    console.log(numberWinner);
    if (numberWinner) {
        res.json({
            status: 'ok',
            numberWinner: numberWinner
        });
    } else {
        res.json({
            status: 'error',
            message: 'No hay número ganador para esa fecha'
        });
    }
})
// Levantar el servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000.");
});

