import './Pagination.css';

function Pagination({ paginaAtual, totalPaginas, aoMudarPagina }) {
  // Se só existe 1 página (ou nenhuma), não faz sentido mostrar paginação.
  if (totalPaginas <= 1) {
    return null;
  }

  const ehPrimeiraPagina = paginaAtual === 1;
  const ehUltimaPagina = paginaAtual === totalPaginas;

  // Gera um array com os números de página: [1, 2, 3, ..., totalPaginas]
  const numerosDePagina = Array.from({ length: totalPaginas }, (_, indice) => indice + 1);

  return (
    <nav className="pagination" aria-label="Paginação de produtos">
      <button
        type="button"
        className="pagination__botao"
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        disabled={ehPrimeiraPagina}
        aria-label="Página anterior"
      >
        Anterior
      </button>

      <ul className="pagination__lista">
        {numerosDePagina.map((numero) => (
          <li key={numero}>
            <button
              type="button"
              className={
                numero === paginaAtual
                  ? 'pagination__numero pagination__numero--ativo'
                  : 'pagination__numero'
              }
              onClick={() => aoMudarPagina(numero)}
              aria-current={numero === paginaAtual ? 'page' : undefined}
              aria-label={`Ir para página ${numero}`}
            >
              {numero}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="pagination__botao"
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        disabled={ehUltimaPagina}
        aria-label="Próxima página"
      >
        Próxima
      </button>
    </nav>
  );
}

export default Pagination;