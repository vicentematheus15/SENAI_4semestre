import { Router } from 'express';
import * as controller from '../controllers/atividade.controller.js';

const atividadeRoutes = Router();

atividadeRoutes.post('/filtrar', controller.filtrarAtividade)


export default atividadeRoutes;