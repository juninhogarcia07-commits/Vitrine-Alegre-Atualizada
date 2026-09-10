import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

// Chave usada para guardar o carrinho no localStorage.
// Centralizada em uma constante para evitar erros de digitação se precisarmos usá-la em outro lugar.
const CHAVE_LOCALSTORAGE = 'vitrine-alegre:carrinho';

/**
 * Lê o carrinho salvo no localStorage, se existir.
 * Retorna um array vazio em caso de erro (dado corrompido, indisponível, etc.),
 * para nunca quebrar a aplicação por causa de um problema de armazenamento local.
 */
function lerCarrinhoSalvo() {
  try {
    const dadosSalvos = localStorage.getItem(CHAVE_LOCALSTORAGE);
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  // Estado inicial "preguiçoso": a função lerCarrinhoSalvo só roda UMA VEZ,
  // na primeira renderização — nunca mais depois disso. Isso evita ler o
  // localStorage repetidamente a cada re-render, o que seria desnecessário
  // e poderia causar inconsistências de performance.
  const [itens, setItens] = useState(lerCarrinhoSalvo);

  // Sempre que "itens" mudar (adicionar, remover, alterar quantidade),
  // salvamos automaticamente no localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(itens));
    } catch {
      // Se o localStorage estiver indisponível (ex: modo privado do navegador
      // com restrições), a aplicação continua funcionando normalmente em memória,
      // só não persiste entre sessões.
    }
  }, [itens]);

  function adicionarProduto(produto, quantidade = 1) {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.produto.id === produto.id);

      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }

      return [...itensAtuais, { produto, quantidade }];
    });
  }

  function aumentarQuantidade(produtoId) {
    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.produto.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  }

  function diminuirQuantidade(produtoId) {
    setItens((itensAtuais) =>
      itensAtuais
        .map((item) =>
          item.produto.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerProduto(produtoId) {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.produto.id !== produtoId));
  }

  const quantidadeTotalItens = itens.reduce((total, item) => total + item.quantidade, 0);

  const valor = {
    itens,
    adicionarProduto,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
    quantidadeTotalItens,
  };

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

export function useCart() {
  const contexto = useContext(CartContext);

  if (!contexto) {
    throw new Error('useCart precisa ser usado dentro de um CartProvider');
  }

  return contexto;
}