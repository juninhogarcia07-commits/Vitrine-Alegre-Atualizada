import './Loading.css';

function Loading({ mensagem = 'Carregando...' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="loading__spinner" aria-hidden="true"></div>
      <p>{mensagem}</p>
    </div>
  );
}

export default Loading;