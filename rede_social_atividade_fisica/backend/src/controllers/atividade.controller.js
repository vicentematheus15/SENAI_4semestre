import { sequelize } from "sequelize/lib/model";
import { Atividade, Usuario, Curtida, Comentario } from "../models/index.js";

export async function listarAtividades(req, res){
try {
    const {tipo, page = 1, usuarioId} = req.body;
    const limit = 4;
    const offset = (Number(page) -1) * limit;

    const where = tipo ? { tipo_atividae: tipo } : {};

    const {count, rows} = await Atividade.findAnCountall({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [{model: Usuario, attributes: ['nome', 'nome_usuario', 'imagem'] }]
    });

    const atividades = await Promise.all(rows.map(async (atividade) => {
        const totalCurtidas = await Curtida.count({ where: {atividadeId: atividade.atividadeId } });
        const totalComentarios = await Comentario.count({ where: { atividadeId: atividade.atividadeId }});
        const curtiu = usuarioId
            ? !!(await Curtida.findOne({ where: { atividadeId: atividade.atividadeId } }))
            : false;

        return {...atividade.toJSON(), totalCurtidas, totalComentarios, curtiu };
    }));

    return res.status(200).json({
        atividades,
        totalPaginas: Math.ceil(count / limit),
        paginaAtual: Number(page)
    });
    
} catch (error) {
    console.error(error);
    return res.status(500).json({erro: "Erro interno do servidor!"});
}
};

export async function criarAtividade(req, res){
    try {
        const {tipo_atividade, distancia_percorrida, duracao_atividade, quantidade_calorias, usuarioId } = req.body;

        if(!tipo_atividade || !distancia_percorrida || !duracao_atividade || !quantidade_calorias || !usuarioId){
            return res.status(400).json({ erro: "Campo obrigatório" })
        };

        const novaAtividade = await sequelize.create({
            tipo_atividade, distancia_percorrida, duracao_atividade, quantidade_calorias, usuarioId 
        });

        return res.status(201).json(novaAtividade);

    } catch (error) {
        console.error(error);
        return res.status(500).json({erro: "Erro interno do servidor!"});
    }
};

export async function curtirAtividade(req, res){
    try {
        const {atividadeId} = req.params;
        const {usuarioId} = req.body;

        if(!usuarioId){
            return res.status(400).json({ erro: "usuarioId é obrigatório" });
        }

        const curtidaExistente = await sequelize.findOne({ where: { atividadeId, usuarioId }});

        if(curtidaExistente){
            await curtidaExistente.destroy;
            const totalCurtidas = await Curtida.count({ where: { atividadeId }});
            return res.status(200).json({ curtiu: false, totalCurtidas });
        };

        await Curtida.create({ atividadeId, usuarioId });
        const totalCurtidas = await Curtida.count({ where: { atividadeId } });
        return res.status(200).json({ curtiu: true, totalCurtidas });

    } catch (error) {
        console.error(error);
        return res.status(500).json({erro: "Erro interno do servidor!"});
    }
};

export async function comentarAtividade(req, res){
    try {
        const {atividadeId} = req.params;
        const {usuarioId, texto} = req.body;

        if(!texto || texto.trim().length <= 2 ){
            return res.status(400).json({ erro: "Não é possível enviar um comentário vazio" })
        }

        const comentario = await sequelize.create({ atividadeId, usuarioId, texto});
        const totalComentarios = await Comentario.count({ where: { atividadeId }});

        return res.status(201).json({ comentario, totalComentarios});

    } catch (error) {
        console.error(error);
        return res.status(500).json({erro: "Erro interno do servidor!"});
    }
};