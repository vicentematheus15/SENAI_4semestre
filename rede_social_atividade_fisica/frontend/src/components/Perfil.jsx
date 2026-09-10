function Perfil({ dados, logado, onClickAtividade }){
return (
    <aside className="perfil">
        <img src={dados.imagem} alt={dados.nome} className="perfil-imagem" />
        <h2>{dados.nome}</h2>

        <div className="perfil-stats">
            <div>
                <span>{dados.qtdAtividades}</span>
                <p>Qtd. Atividades</p>
            </div>
            <div>
                <span>{dados.qtdCalorias}</span>
                <p>Qtd. Calorias</p>
            </div>
        </div>

        <button 
            className="btn-atividade"
            disabled={!logado}
            onClick={onClickAtividade}
        >
            Atividade
        </button>

        <footer className="perfil-footer">
            <p>SAEPSaude</p>
            <span>Copyright - 2025/2026</span>
        </footer>
    </aside>
)
};

export default Perfil;