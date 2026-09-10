import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUsuario } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function aoEnviarFormulario(evento) {
    evento.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      const dadosUsuario = await loginUsuario(username, password);
      login(dadosUsuario);
      navigate('/');
    } catch {
      setErro('Usuário ou senha inválidos.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="login">
      <form className="login__formulario" onSubmit={aoEnviarFormulario}>
        <h1 className="login__titulo">Entrar</h1>

        <label className="login__campo">
          Usuário
          <input
            type="text"
            value={username}
            onChange={(evento) => setUsername(evento.target.value)}
            required
          />
        </label>

        <label className="login__campo">
          Senha
          <input
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            required
          />
        </label>

        {erro && (
          <p className="login__erro" role="alert">
            {erro}
          </p>
        )}

        <button type="submit" className="login__botao" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="login__dica">
          Use um usuário de teste da DummyJSON, por exemplo:{' '}
          <strong>kminchelle</strong> / <strong>0lelplR</strong>
        </p>

        <Link to="/" className="login__link-voltar">
          Voltar para a vitrine
        </Link>
      </form>
    </main>
  );
}

export default Login;