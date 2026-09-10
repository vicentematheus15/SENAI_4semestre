import axios from 'axios';

const api = axios.create({
    baseUrl: import.meta.env.VITE_API_URL
});

export async function login(email, senha) {
    const response = await api.post('usuaros/login', {email, senha});
    return response.data;
};

export async function listarAtividades(tipo, page, usuarioId) {
    const response = await api.get('/atividades',{
        params: { tipo, page, usuarioId }
    });
    return response.data;
};

export async function criarAtividade(dados){
    const response = await api.post('/atividades/criar', dados);
    return response.data;
};

export async function curtirAtividade(atividadeId, usuarioId){
    const response = await api.post(`/atividades/${atividadeId}/curtir`, { usuarioId });
    return response.data;
};

export async function comentarAtividade(atividadeId, usuarioId){
    const response = await api.post(`/atividades/${atividadeId}/comentar`, { usuarioId });
    return response.data;
};

export default api;