// frontend/src/components/ListaAtividades.jsx
import { useState, useEffect } from 'react';
import { listarAtividades, curtirAtividade } from '../services/api';
import CardAtividade from './CardAtividade';

const FILTROS = ['corrida', 'caminhada', 'trilha'];

function ListaAtividades({ usuario, onPrecisaLogin }) {
  const [atividades, setAtividades] = useState([]);
  const [tipo, setTipo] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [comentandoId, setComentandoId] = useState(null);

  const usuarioId = usuario?.usuarioId;

  useEffect(() => {
    listarAtividades({ tipo, page, usuarioId }).then((dados) => {
      setAtividades(dados.atividades);
      setTotalPaginas(dados.totalPaginas);
    });
  }, [tipo, page, usuarioId]);

  function exigirLogin() {
    if (!usuario) {
      onPrecisaLogin();
      return false;
    }
    return true;
  }

  function escolherFiltro(novoTipo) {
    if (!exigirLogin()) return;
    setTipo(tipo === novoTipo ? null : novoTipo);
    setPage(1);
  }

  function irParaPagina(numero) {
    if (!exigirLogin()) return;
    setPage(numero);
  }

  async function handleCurtir(atividadeId) {
    if (!exigirLogin()) return;
    const resultado = await curtirAtividade(atividadeId, usuarioId);
    setAtividades((lista) =>
      lista.map((a) =>
        a.atividadeId === atividadeId
          ? { ...a, curtiu: resultado.curtiu, totalCurtidas: resultado.totalCurtidas }
          : a
      )
    );
  }

  function handleComentar(atividadeId) {
    if (!exigirLogin()) return;
    setComentandoId(comentandoId === atividadeId ? null : atividadeId);
  }

  return (
    <section className="lista">
      <nav className="filtros">
        {FILTROS.map((f) => (
          <button
            key={f}
            className={tipo === f ? 'filtro ativo' : 'filtro'}
            onClick={() => escolherFiltro(f)}
          >
            {f}
          </button>
        ))}
      </nav>

      {atividades.map((a) => (
        <div key={a.atividadeId}>
          <CardAtividade atividade={a} onCurtir={handleCurtir} onComentar={handleComentar} />
          {/* caixa de comentário entra aqui no próximo passo (comentandoId === a.atividadeId) */}
        </div>
      ))}

      <nav className="paginacao">
        <button disabled={page === 1} onClick={() => irParaPagina(1)}>Primeira</button>
        <button disabled={page === 1} onClick={() => irParaPagina(page - 1)}>Anterior</button>

        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            className={n === page ? 'pagina ativo' : 'pagina'}
            onClick={() => irParaPagina(n)}
          >
            {n}
          </button>
        ))}

        <button disabled={page === totalPaginas} onClick={() => irParaPagina(page + 1)}>Próxima</button>
        <button disabled={page === totalPaginas} onClick={() => irParaPagina(totalPaginas)}>Última</button>
      </nav>
    </section>
  );
}

export default ListaAtividades;