import { Usuario, Atividade } from "../models/index.js";

export async function login(req, res){
    try {
        {}
    } catch (error) {
        console.error(error)
        return res.status(500).json({erro: "Erro interno do servidor!"})
    }
}
