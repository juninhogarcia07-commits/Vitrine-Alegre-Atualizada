import './ErrorState.css';

function ErrorState({ mensagem = 'Ocorreu um erro ao carregar os dados.', aoTentarNovamente }) {
  return (
    <div className="error-state" role="alert">
      <p className="error-state__titulo">Ops! Algo deu errado.</p>
      <p className="error-state__mensagem">{mensagem}</p>

      {aoTentarNovamente && (
        <button
          type="button"
          className="error-state__botao"
          onClick={aoTentarNovamente}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export default ErrorState;