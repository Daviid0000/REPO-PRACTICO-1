import {Router} from 'express';
import {eventoCtrl} from '../controller/event.controllers.js';

const routerevent = Router();

// Aquí van las cinco operaciones básicas (CRUD)

    routerevent.get('/evento/', (req, res) => {res.send('ZETAZETAZETAAAA')})
    routerevent.post('/evento/', eventoCtrl.createEvent)
    routerevent.put('/evento/:id')
    routerevent.get('/evento/:id')
    routerevent.delete('/evento/:id')

    export {routerevent}