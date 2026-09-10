import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__conteudo">
        <p>© {new Date().getFullYear()} Vitrine Alegre. Todos os direitos reservados.</p>
        <p className="footer__texto-secundario">
          Projeto acadêmico — dados fornecidos pela DummyJSON.
        </p>
      </div>
    </footer>
  );
}

export default Footer;