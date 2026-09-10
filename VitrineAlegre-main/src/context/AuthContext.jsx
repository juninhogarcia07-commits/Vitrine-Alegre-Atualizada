import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const CHAVE_LOCALSTORAGE = 'vitrine-alegre:usuario';

/**
 * Lê o usuário salvo no localStorage, seguindo o mesmo padrão
 * de leitura preguiçosa usado no CartContext.
 */
function lerUsuarioSalvo() {
  try {
    const dadosSalvos = localStorage.getItem(CHAVE_LOCALSTORAGE);
    return dadosSalvos ? JSON.parse(dadosSalvos) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(lerUsuarioSalvo);

  useEffect(() => {
    try {
      if (usuario) {
        localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(usuario));
      } else {
        localStorage.removeItem(CHAVE_LOCALSTORAGE);
      }
    } catch {
      // Se o localStorage falhar, a sessão simplesmente não persiste — não quebra a aplicação.
    }
  }, [usuario]);

  function login(dadosUsuario) {
    setUsuario(dadosUsuario);
  }

  function logout() {
    setUsuario(null);
  }

  const valor = {
    usuario,
    login,
    logout,
    estaLogado: Boolean(usuario),
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
  }

  return contexto;
}