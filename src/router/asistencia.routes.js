import {Router} from 'express';
import {asistenciaCtrl} from '../controller/asistencia.controllers.js';

const router = Router();

// Aquí van las cinco operaciones básicas (CRUD)

    router.get('/', (req, res) => {res.send('ZETAZETAZETAAAA')})
    router.post('/', asistenciaCtrl.createGuest)
    router.put('/:id')
    router.get('/:id')
    router.delete('/:id')

    export {router}