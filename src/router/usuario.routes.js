import {Router} from 'express';
import {usuarioCtrl} from '../controller/usuario.controllers.js';

const routerUsuario = Router();

// Aquí van las cinco operaciones básicas (CRUD)

routerUsuario.get('/usuario/', (req, res) => {res.send('ZETAZETAZETAAAA')})
routerUsuario.post('/usuario/', usuarioCtrl.createUser)
routerUsuario.put('/usuario/:id')
routerUsuario.get('/usuario/:id')
routerUsuario.delete('/usuario/:id_user', usuarioCtrl.deleteEvent)

    export {routerUsuario}