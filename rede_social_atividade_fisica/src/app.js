import 'dotenv/config';
import express from 'express';

const app = express();

app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/atividades', atividadesRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em: http://localhost:3000")
}
)