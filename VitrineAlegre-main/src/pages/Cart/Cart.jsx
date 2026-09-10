import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { obterPrecosFormatados, calcularTotaisCarrinho } from '../../utils/formatters';
import EmptyState from '../../components/EmptyState/EmptyState';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import './Cart.css';

// Valor fixo de frete, simulado para esta atividade (sem integração real com CEP/transportadora).
const FRETE_FIXO = 'R$ 19,90';

function Cart() {
  const { itens, aumentarQuantidade, diminuirQuantidade, removerProduto } = useCart();

  if (itens.length === 0) {
    return (
      <main className="cart cart--vazio">
        <EmptyState mensagem="Seu carrinho está vazio." />
        <Link to="/" className="cart__link-voltar">
          Voltar para a vitrine
        </Link>
      </main>
    );
  }

  // Os totais são recalculados a cada renderização, a partir da lista atual de itens.
  const { subtotalFormatado, descontoFormatado, totalFormatado } = calcularTotaisCarrinho(itens);

  return (
    <main className="cart">
      <h1 className="cart__titulo">Meu Carrinho</h1>

      <div className="cart__layout">
        <ul className="cart__lista">
          {itens.map(({ produto, quantidade }) => {
            const { precoFinalFormatado } = obterPrecosFormatados(
              produto.price,
              produto.discountPercentage
            );

            return (
              <li key={produto.id} className="cart__item">
                <img
                  src={produto.thumbnail}
                  alt={produto.title}
                  className="cart__item-imagem"
                />

                <div className="cart__item-info">
                  <h2 className="cart__item-titulo">{produto.title}</h2>
                  <p className="cart__item-preco-unitario">{precoFinalFormatado} (unidade)</p>

                  <QuantitySelector
                    quantidade={quantidade}
                    aoAumentar={() => aumentarQuantidade(produto.id)}
                    aoDiminuir={() => diminuirQuantidade(produto.id)}
                    quantidadeMinima={1}
                    quantidadeMaxima={produto.stock}
                  />
                </div>

                <button
                  type="button"
                  className="cart__item-remover"
                  onClick={() => removerProduto(produto.id)}
                  aria-label={`Remover ${produto.title} do carrinho`}
                >
                  Remover
                </button>
              </li>
            );
          })}
        </ul>

        <aside className="cart__resumo">
          <h2 className="cart__resumo-titulo">Resumo do pedido</h2>

          <div className="cart__resumo-linha">
            <span>Subtotal</span>
            <span>{subtotalFormatado}</span>
          </div>

          <div className="cart__resumo-linha cart__resumo-linha--desconto">
            <span>Desconto</span>
            <span>− {descontoFormatado}</span>
          </div>

          <div className="cart__resumo-linha">
            <span>Frete</span>
            <span>{FRETE_FIXO}</span>
          </div>

          <div className="cart__resumo-linha cart__resumo-linha--total">
            <span>Total</span>
            <span>{totalFormatado}</span>
          </div>

          <button type="button" className="cart__botao-finalizar">
            Finalizar compra
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Cart;