// frontend/src/components/CardAtividade.jsx
function formatarData(dataISO) {
  const data = new Date(dataISO);
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = String(data.getFullYear()).slice(-2);
  return `${horas}:${minutos} - ${dia}/${mes}/${ano}`;
}

function formatarDistancia(metros) {
  return `${(metros / 1000).toFixed(1)} km`;
}

function formatarDuracao(minutos) {
  return `${(minutos / 60).toFixed(2)} h`;
}

function CardAtividade({ atividade, onCurtir, onComentar }) {
  const usuario = atividade.Usuario;

  return (
    <div className="card-atividade">
      <div className="card-cabecalho">
        <h3>{atividade.tipo_atividade}</h3>
        <span>{formatarData(atividade.createdAt)}</span>
      </div>

      <div className="card-corpo">
        <img
          src={`/imagens_perfil/${usuario.imagem}`}
          alt={usuario.nome_usuario}
          className="card-avatar"
        />
        <div>
          <p className="card-usuario">{usuario.nome_usuario}</p>
          <div className="card-metricas">
            <span>{formatarDistancia(atividade.distancia_percorrida)}</span>
            <span>{formatarDuracao(atividade.duracao_atividade)}</span>
            <span>{atividade.quantidade_calorias} Calorias</span>
          </div>
        </div>

        <div className="card-interacoes">
          <button onClick={() => onCurtir(atividade.atividadeId)}>
            <img
              src={atividade.curtiu ? '/icones/CoracaoVermelho.svg' : '/icones/coracao.svg'}
              alt="curtir"
            />
            {atividade.totalCurtidas}
          </button>
          <button onClick={() => onComentar(atividade.atividadeId)}>
            <img src="/icones/comentario.svg" alt="comentar" />
            {atividade.totalComentarios}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardAtividade;