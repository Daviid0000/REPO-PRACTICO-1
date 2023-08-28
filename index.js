import express from 'express';
import dotenv from 'dotenv';
import {router} from './src/router/asistencia.routes.js';
import {routerevent} from './src/router/event.routes.js'
import { routerUsuario } from './src/router/usuario.routes.js';
dotenv.config()


const app = express()
const PORT = process.env.PORT || 5000;


app.use(express.json())







app.use(router)
app.use(routerevent)
app.use(routerUsuario)


  app.listen(PORT, () => {
    console.log('Server on port', PORT);
  });