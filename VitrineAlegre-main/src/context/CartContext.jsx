import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const CHAVE_LOCALSTORAGE = 'vitrine-alegre:carrinho';

function lerCarrinhoSalvo() {
  try {
    const dadosSalvos = localStorage.getItem(CHAVE_LOCALSTORAGE);
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [itens, setItens] = useState(lerCarrinhoSalvo);

  // Mensagem do toast exibido ao adicionar um produto. Fica null quando não há nada a mostrar.
  const [mensagemToast, setMensagemToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(itens));
    } catch {
      // Se o localStorage falhar, a aplicação continua funcionando só em memória.
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

    setMensagemToast(`${produto.title} adicionado ao carrinho`);
  }

  function limparMensagemToast() {
    setMensagemToast(null);
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
    mensagemToast,
    limparMensagemToast,
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