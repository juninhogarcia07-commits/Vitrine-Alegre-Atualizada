import { useEffect } from 'react';
import './Toast.css';

// Tempo que a mensagem fica visível antes de sumir sozinha, em milissegundos.
const DURACAO_TOAST_MS = 3000;

function Toast({ mensagem, aoFechar }) {
  useEffect(() => {
    // Se não há mensagem, não precisa agendar nada.
    if (!mensagem) {
      return;
    }

    const temporizador = setTimeout(() => {
      aoFechar();
    }, DURACAO_TOAST_MS);

    // Limpa o temporizador anterior se uma nova mensagem chegar antes do tempo acabar,
    // reiniciando a contagem — mesmo princípio usado no useDebounce.
    return () => clearTimeout(temporizador);
  }, [mensagem, aoFechar]);

  // Quando não há mensagem, o componente simplesmente não renderiza nada.
  if (!mensagem) {
    return null;
  }

  return (
    <div className="toast" role="status" aria-live="polite">
      {mensagem}
    </div>
  );
}

export default Toast;