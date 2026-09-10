import Rating from '../../components/Rating/Rating';
import './ProductReviews.css';

function ProductReviews({ avaliacoes }) {
  if (!avaliacoes || avaliacoes.length === 0) {
    return (
      <section className="product-reviews">
        <h2 className="product-reviews__titulo">Avaliações</h2>
        <p className="product-reviews__vazio">Este produto ainda não possui avaliações.</p>
      </section>
    );
  }

  return (
    <section className="product-reviews">
      <h2 className="product-reviews__titulo">Avaliações ({avaliacoes.length})</h2>

      <ul className="product-reviews__lista">
        {avaliacoes.map((avaliacao) => (
          <li key={`${avaliacao.reviewerName}-${avaliacao.date}`} className="product-reviews__item">
            <div className="product-reviews__cabecalho">
              <span className="product-reviews__autor">{avaliacao.reviewerName}</span>
              <Rating nota={avaliacao.rating} mostrarNumero={false} />
            </div>
            <p className="product-reviews__comentario">{avaliacao.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductReviews;