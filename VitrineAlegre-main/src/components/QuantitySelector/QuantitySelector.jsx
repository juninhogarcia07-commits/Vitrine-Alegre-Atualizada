import './QuantitySelector.css';

/**
 * Seletor de quantidade com botões de + e -.
 * @param {number} quantidade - valor atual
 * @param {function} aoAumentar
 * @param {function} aoDiminuir
 * @param {number} quantidadeMinima - padrão 1 (não deixa ir a 0 ou negativo)
 * @param {number} quantidadeMaxima - opcional, ex: limitado pelo estoque
 */
function QuantitySelector({
  quantidade,
  aoAumentar,
  aoDiminuir,
  quantidadeMinima = 1,
  quantidadeMaxima,
}) {
  const desabilitarDiminuir = quantidade <= quantidadeMinima;
  const desabilitarAumentar = quantidadeMaxima !== undefined && quantidade >= quantidadeMaxima;

  return (
    <div className="quantity-selector">
      <button
        type="button"
        className="quantity-selector__botao"
        onClick={aoDiminuir}
        disabled={desabilitarDiminuir}
        aria-label="Diminuir quantidade"
      >
        −
      </button>

      <span className="quantity-selector__valor" aria-live="polite">
        {quantidade}
      </span>

      <button
        type="button"
        className="quantity-selector__botao"
        onClick={aoAumentar}
        disabled={desabilitarAumentar}
        aria-label="Aumentar quantidade"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;