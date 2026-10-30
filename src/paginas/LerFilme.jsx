import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../servicos/api';

function LerFilme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarFilme() {
      setCarregando(true);
      setErro('');

      try {
        const resposta = await api.get(`/${id}`);
        setFilme(resposta.data);
      } catch (error) {
        setErro('Não foi possível encontrar o filme informado.');
      } finally {
        setCarregando(false);
      }
    }

    buscarFilme();
  }, [id]);

  if (carregando) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando detalhes do filme...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/')}
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  const imagemAlternativa =
    'https://placehold.co/600x900/212529/FFFFFF?text=Sem+Poster';

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="row g-0">
              <div className="col-12 col-md-5 bg-dark text-center">
                <img
                  src={filme.imagem || imagemAlternativa}
                  alt={`Pôster do filme ${filme.nome}`}
                  className="img-fluid detalhe-poster"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = imagemAlternativa;
                  }}
                />
              </div>

              <div className="col-12 col-md-7">
                <div className="card-body p-4 p-lg-5">
                  <span className="badge text-bg-primary mb-3">
                    Detalhes do filme
                  </span>

                  <h2 className="fw-bold mb-4">{filme.nome}</h2>

                  <div className="mb-3">
                    <span className="text-secondary">Identificador</span>
                    <p className="fs-5 fw-semibold mb-0">{filme.id}</p>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <span className="text-secondary">Gênero</span>
                    <p className="fs-5 fw-semibold mb-0">
                      {filme.genero || 'Não informado'}
                    </p>
                  </div>

                  <hr />

                  <div className="mb-4">
                    <span className="text-secondary">Ano de lançamento</span>
                    <p className="fs-5 fw-semibold mb-0">
                      {filme.ano || 'Não informado'}
                    </p>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/')}
                  >
                    Voltar ao catálogo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LerFilme;