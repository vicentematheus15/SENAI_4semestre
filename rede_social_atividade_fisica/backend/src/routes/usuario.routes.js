import { Router } from "express";
import * as controller from "usuario.controller.js"

const usuarioRoutes = Router();

usuarioRoutes.post('/cadastrar', controller.cadastro())
usuarioRoutes.post('/login', controller.login())


export default usuarioRoutes;