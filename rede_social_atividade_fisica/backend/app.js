import 'dotenv/config';
import express from 'express';
import usuarioRoutes from './src/routes/usuario.routes.js';
import atividadeRoutes from './src/routes/atividade.routes.js';
import './src/models/index.js'
import sequelize from './src/database/database.js';

const app = express();

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/atividades', atividadeRoutes);

sequelize.sync({alter:true}).then(() => {
    app.listen(process.env.API_PORT, () => 
        console.log(`Servidor rodando em: http://localhost:${process.env.API_PORT}`)
    );
});