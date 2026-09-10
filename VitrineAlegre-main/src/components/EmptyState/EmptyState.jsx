import './EmptyState.css';

function EmptyState({ mensagem = 'Nenhum item encontrado.' }) {
  return (
    <div className="empty-state">
      <p className="empty-state__mensagem">{mensagem}</p>
    </div>
  );
}

export default EmptyState;