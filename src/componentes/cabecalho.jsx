import { Link, NavLink } from 'react-router-dom';

function Cabecalho() {
  return (
    <header className="cabecalho">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand marca" to="/">
            <span className="marca-icone">▶</span>
            Cine<span>Catálogo</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuPrincipal"
            aria-controls="menuPrincipal"
            aria-expanded="false"
            aria-label="Abrir ou fechar menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menuPrincipal">
            <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'link-ativo' : ''}`
                }
              >
                Início
              </NavLink>

              <NavLink
                to="/alterar"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'link-ativo' : ''}`
                }
              >
                Alterar filme
              </NavLink>

              <NavLink
                to="/apagar"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'link-ativo' : ''}`
                }
              >
                Apagar filme
              </NavLink>

              <Link to="/criar" className="btn btn-cadastrar">
                + Cadastrar filme
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Cabecalho;