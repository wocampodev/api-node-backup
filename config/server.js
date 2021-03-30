const express = require('express');
const cors = require('cors');

const { DBConnection } = require('../database/bootstrap');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async conectarDB() {
        await DBConnection();
    }

    middlewares() {

        // Cors
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.usuariosPath, require('../routes/usuario.routes') );

    }

    listen() {

        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });

    }

}


module.exports = Server;