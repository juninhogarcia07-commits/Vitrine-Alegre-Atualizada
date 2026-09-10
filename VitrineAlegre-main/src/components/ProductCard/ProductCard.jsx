import { Link } from 'react-router-dom';
import { obterPrecosFormatados } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import Rating from '../Rating/Rating';
import './ProductCard.css';

function ProductCard({ produto }) {
  const { id, title, category, price, discountPercentage, rating, thumbnail } = produto;
  const { adicionarProduto } = useCart();

  const { precoOriginalFormatado, precoFinalFormatado, temDesconto } =
    obterPrecosFormatados(price, discountPercentage);

  function aoClicarAdicionar() {
    adicionarProduto(produto, 1);
  }

  return (
    <div className="product-card">
      <Link to={`/produtos/${id}`} className="product-card__link-imagem">
        <div className="product-card__imagem-container">
          <img src={thumbnail} alt={title} className="product-card__imagem" />

          {temDesconto && (
            <span className="product-card__selo-desconto">
              -{Math.round(discountPercentage)}%
            </span>
          )}
        </div>
      </Link>

      <div className="product-card__conteudo">
        <span className="product-card__categoria">{category}</span>

        <Link to={`/produtos/${id}`} className="product-card__link-titulo">
          <h3 className="product-card__titulo">{title}</h3>
        </Link>

        <Rating nota={rating} />

        <div className="product-card__precos">
          {temDesconto && (
            <span className="product-card__preco-original">{precoOriginalFormatado}</span>
          )}
          <span className="product-card__preco-final">{precoFinalFormatado}</span>
        </div>

        <button
  type="button"
  className="product-card__botao-adicionar"
  onClick={aoClicarAdicionar}
  aria-label={`Adicionar ${title} ao carrinho`}
>
  Adicionar
</button>
      </div>
    </div>
  );
}

export default ProductCard;