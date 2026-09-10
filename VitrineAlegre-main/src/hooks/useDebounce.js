import { useState, useEffect } from 'react';

/**
 * Hook genérico que "atrasa" a atualização de um valor.
 * Útil para busca: só queremos reagir ao texto digitado depois
 * que o usuário parar de digitar por um tempo (delay).
 *
 * @param {*} valor - o valor que muda rapidamente (ex: texto do input)
 * @param {number} delay - tempo de espera em milissegundos
 * @returns {*} o valor "atrasado", que só atualiza após o delay de silêncio
 */
function useDebounce(valor, delay) {
  const [valorComDebounce, setValorComDebounce] = useState(valor);

  useEffect(() => {
    // Agenda a atualização do valor "atrasado" depois do delay
    const temporizador = setTimeout(() => {
      setValorComDebounce(valor);
    }, delay);

    // Se o valor mudar de novo antes do delay terminar,
    // cancelamos o temporizador anterior e começamos a contar de novo.
    // É isso que faz o debounce funcionar: só o "último" timer sobrevive.
    return () => {
      clearTimeout(temporizador);
    };
  }, [valor, delay]);

  return valorComDebounce;
}

export default useDebounce;