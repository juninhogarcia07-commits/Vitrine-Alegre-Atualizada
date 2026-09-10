import './Rating.css';

const TOTAL_ESTRELAS = 5;

/**
 * Componente reutilizável de avaliação em estrelas.
 * @param {number} nota - valor de 0 a 5 (pode ter casas decimais, ex: 4.3)
 * @param {boolean} mostrarNumero - se deve exibir a nota numérica ao lado das estrelas
 */
function Rating({ nota, mostrarNumero = true }) {
  const estrelas = Array.from({ length: TOTAL_ESTRELAS });

  return (
    <div className="rating">
      <div className="rating__estrelas" aria-hidden="true">
        {estrelas.map((_, indice) => (
          <span
            key={indice}
            className={
              indice < Math.round(nota)
                ? 'rating__estrela rating__estrela--cheia'
                : 'rating__estrela'
            }
          >
            ★
          </span>
        ))}
      </div>

      {mostrarNumero && <span className="rating__nota">{nota.toFixed(1)}</span>}

      {/* Texto acessível para leitores de tela, já que as estrelas são decorativas */}
      <span className="rating__texto-acessivel">
        Avaliação: {nota.toFixed(1)} de {TOTAL_ESTRELAS} estrelas
      </span>
    </div>
  );
}

export default Rating;