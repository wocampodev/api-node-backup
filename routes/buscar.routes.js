const { Router } = require('express');

const { BuscarController } = require('../controllers');


const router = Router();

router.get( '/:coleccion/:termino', BuscarController.buscar );


module.exports = router;