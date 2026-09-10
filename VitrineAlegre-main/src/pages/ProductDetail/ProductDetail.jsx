import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { buscarProdutoPorId } from '../../services/api';
import { obterPrecosFormatados } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import Loading from '../../components/Loading/Loading';
import ErrorState from '../../components/ErrorState/ErrorState';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import Rating from '../../components/Rating/Rating';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import ProductReviews from './ProductReviews';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { adicionarProduto } = useCart();

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

  async function carregarProduto() {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarProdutoPorId(id);
      setProduto(dados);
      setQuantidade(1); // Reseta a quantidade ao carregar um novo produto
    } catch (erroCapturado) {
      setErro(erroCapturado.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProduto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (carregando) {
    return <Loading mensagem="Carregando produto..." />;
  }

  if (erro) {
    return <ErrorState mensagem={erro} aoTentarNovamente={carregarProduto} />;
  }

  if (!produto) {
    return null;
  }

  const {
    id: idProduto,
    title,
    category,
    brand,
    description,
    price,
    discountPercentage,
    rating,
    images,
    stock,
    reviews,
    shippingInformation,
    warrantyInformation,
    returnPolicy,
  } = produto;

  const { precoOriginalFormatado, precoFinalFormatado, temDesconto } =
    obterPrecosFormatados(price, discountPercentage);

  function aoClicarAdicionar() {
    adicionarProduto(produto, quantidade);
    setQuantidade(1); // Reseta o seletor após adicionar
  }

  return (
    <>
      <main className="product-detail">
        <nav className="product-detail__breadcrumb" aria-label="Navegação estrutural">
          <Link to="/">Vitrine</Link> / <span>{category}</span> / <span>{title}</span>
        </nav>

        <div className="product-detail__conteudo">
          <ProductGallery imagens={images} nomeProduto={title} />

          <div className="product-detail__info">
            <span className="product-detail__categoria">{category}</span>
            <h1 className="product-detail__titulo">{title}</h1>
            <p className="product-detail__marca">Marca: {brand}</p>
            <p className="product-detail__sku">SKU: {idProduto}</p>

            <Rating nota={rating} />

            <div className="product-detail__precos">
              {temDesconto && (
                <span className="product-detail__preco-original">{precoOriginalFormatado}</span>
              )}
              <span className="product-detail__preco-final">{precoFinalFormatado}</span>
            </div>

            <p className="product-detail__estoque">Estoque: {stock} unidades</p>

            <p className="product-detail__descricao">{description}</p>

            <div className="product-detail__acao-compra">
              <QuantitySelector
                quantidade={quantidade}
                aoAumentar={() => setQuantidade((q) => q + 1)}
                aoDiminuir={() => setQuantidade((q) => q - 1)}
                quantidadeMinima={1}
                quantidadeMaxima={stock}
              />

              <button
                type="button"
                className="product-detail__botao-adicionar"
                onClick={aoClicarAdicionar}
              >
                Adicionar ao carrinho
              </button>
            </div>

            <dl className="product-detail__especificacoes">
              <div className="product-detail__especificacao-item">
                <dt>Envio</dt>
                <dd>{shippingInformation}</dd>
              </div>
              <div className="product-detail__especificacao-item">
                <dt>Garantia</dt>
                <dd>{warrantyInformation}</dd>
              </div>
              <div className="product-detail__especificacao-item">
                <dt>Devolução</dt>
                <dd>{returnPolicy}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>

      <ProductReviews avaliacoes={reviews} />
    </>
  );
}

export default ProductDetail;