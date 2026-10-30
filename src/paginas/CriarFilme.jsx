import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../servicos/api';

function CriarFilme() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [ano, setAno] = useState('');
  const [imagem, setImagem] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function cadastrarFilme(event) {
    event.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      await api.post('/', {
        nome,
        genero,
        ano,
        imagem,
      });

      alert('Filme cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      setErro(
        'Não foi possível cadastrar o filme. Verifique a conexão com a API.',
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold mb-2">Cadastrar filme</h2>

              <p className="text-secondary mb-4">
                Preencha os dados para adicionar um filme ao catálogo.
              </p>

              <form onSubmit={cadastrarFilme}>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome do filme
                  </label>

                  <input
                    id="nome"
                    type="text"
                    className="form-control"
                    placeholder="Ex.: Interestelar"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="genero" className="form-label">
                    Gênero
                  </label>

                  <input
                    id="genero"
                    type="text"
                    className="form-control"
                    placeholder="Ex.: Ficção científica"
                    value={genero}
                    onChange={(event) => setGenero(event.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="ano" className="form-label">
                    Ano de lançamento
                  </label>

                  <input
                    id="ano"
                    type="number"
                    className="form-control"
                    placeholder="Ex.: 2014"
                    min="1888"
                    max="2100"
                    value={ano}
                    onChange={(event) => setAno(event.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="imagem" className="form-label">
                    URL do pôster
                  </label>

                  <input
                    id="imagem"
                    type="url"
                    className="form-control"
                    placeholder="https://exemplo.com/poster.jpg"
                    value={imagem}
                    onChange={(event) => setImagem(event.target.value)}
                  />

                  <div className="form-text">
                    Informe o endereço de uma imagem disponível na internet.
                  </div>
                </div>

                {imagem.trim() && (
                  <div className="mb-4 text-center">
                    <p className="fw-semibold">Prévia do pôster</p>

                    <img
                      src={imagem}
                      alt="Prévia do pôster"
                      className="img-fluid rounded shadow-sm"
                      style={{
                        maxHeight: '280px',
                        objectFit: 'contain',
                      }}
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                      onLoad={(event) => {
                        event.currentTarget.style.display = 'inline-block';
                      }}
                    />
                  </div>
                )}

                {erro && (
                  <div className="alert alert-danger" role="alert">
                    {erro}
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary flex-grow-1"
                    disabled={salvando}
                  >
                    {salvando ? 'Cadastrando...' : 'Cadastrar filme'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/')}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarFilme;