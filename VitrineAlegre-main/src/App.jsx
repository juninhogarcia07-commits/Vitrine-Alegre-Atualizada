import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Toast from './components/Toast/Toast';
import { useCart } from './context/CartContext';

function App() {
  const { mensagemToast, limparMensagemToast } = useCart();

  return (
    <div>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <Header />

      <div id="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos/:id" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />

      <Toast mensagem={mensagemToast} aoFechar={limparMensagemToast} />
    </div>
  );
}

export default App;