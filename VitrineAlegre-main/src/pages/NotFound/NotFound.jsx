import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main className="not-found">
      <h1 className="not-found__codigo">404</h1>
      <p className="not-found__mensagem">Página não encontrada.</p>
      <Link to="/" className="not-found__link">
        Voltar para a vitrine
      </Link>
    </main>
  );
}

export default NotFound;