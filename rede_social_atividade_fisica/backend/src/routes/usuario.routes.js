import { Router } from "express";
import * as controller from "../controllers/usuario.controller.js"

const usuarioRoutes = Router();

usuarioRoutes.post('/login', controller.login);


export default usuarioRoutes;