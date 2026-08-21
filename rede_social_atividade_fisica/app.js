import 'dotenv/config';
import express from 'express';
import usuarioRoutes from './backend/src/routes/usuario.routes.js';
import atividadeRoutes from './backend/src/routes/atividade.routes.js';
import './backend/src/models/index.js'

const app = express();

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/atividades', atividadeRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em: http://localhost:3000")
}
)