import { Usuario, Atividade } from "../models/index.js";

export async function login(req, res){
    try {
        const {email, senha} = req.body;
        
        if(!email || !senha){
            return res.status(400).json({ erro: "Email ou senha obrigatório" });
        }

        const usuario = await Usuario.findOne({ where: { email }});

        if(!usuario || usuario.senha !== senha){
            return res.status(401).json({ erro: "Email ou senha incorretos" });
        }

        return res.status(200).json({
            usuarioId: usuario.usuarioId,
            nome: usuario.nome,
            nome_usuario: usuario.nome_usuario,
            imagem: usuario.imagem
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({erro: "Erro interno do servidor!"})
    }
}
