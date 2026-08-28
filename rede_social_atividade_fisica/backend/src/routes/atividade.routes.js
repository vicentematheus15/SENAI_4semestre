import { Router } from 'express';
import * as controller from '../controllers/atividade.controller.js';

const atividadeRoutes = Router();

atividadeRoutes.get('/', controller.listarAtividades);
atividadeRoutes.post('/criar', controller.criarAtividade);
atividadeRoutes.post('/:atividadeId/curtir', controller.curtirAtividade);
atividadeRoutes.post('/:atividadeId/comentar', controller.comentarAtividade);


export default atividadeRoutes;