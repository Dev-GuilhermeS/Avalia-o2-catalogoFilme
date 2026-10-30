import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../servicos/api';

function Inicio() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await api.get('/');
        setFilmes(resposta.data);
      } catch (error) {
        setErro('Não foi possível carregar os filmes.');
      } finally {
        setCarregando(false);
      }
    }

    buscarFilmes();
  }, []);

  if (carregando) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando catálogo...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{erro}</div>
      </div>
    );
  }

  return (
      
    <div className="container py-5">
    <div className="mb-4">
    <h2 className="fw-bold mb-1">Explore os filmes</h2>
    <p className="text-secondary mb-0">
      Descubra histórias, gêneros e grandes clássicos do cinema.
    </p>
    </div>

      {filmes.length === 0 ? (
        <div className="alert alert-info">
          Nenhum filme cadastrado. Que tal adicionar o primeiro?
        </div>
      ) : (
        <div className="row g-4">
          {filmes.map((filme) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={filme.id}>
              <div className="card h-100 shadow-sm border-0 filme-card">
                <img
                  src={
                    filme.imagem ||
                    'https://placehold.co/600x900/212529/FFFFFF?text=Sem+Poster'
                  }
                  className="card-img-top poster-filme"
                  alt={`Pôster do filme ${filme.nome}`}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      'https://placehold.co/600x900/212529/FFFFFF?text=Sem+Poster';
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{filme.nome}</h5>

                  <p className="text-secondary mb-1">
                    {filme.genero || 'Gênero não informado'}
                  </p>

                  <p className="text-secondary">
                    {filme.ano || 'Ano não informado'}
                  </p>

                  <Link
                    to={`/ler/${filme.id}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Inicio;