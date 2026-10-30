import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../servicos/api';

function ApagarFilme() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [filme, setFilme] = useState(null);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [apagando, setApagando] = useState(false);

  async function procurarFilme(event) {
    event.preventDefault();

    setErro('');
    setMensagem('');
    setFilme(null);

    try {
      const resposta = await api.get(`/${id.trim()}`);
      setFilme(resposta.data);
    } catch (error) {
      setErro('Filme não encontrado. Confira o ID informado.');
    }
  }

  async function apagarFilme() {
    setErro('');
    setMensagem('');
    setApagando(true);

    try {
      await api.delete(`/${filme.id}`);

      setMensagem('Filme apagado com sucesso!');
      setFilme(null);
      setId('');
    } catch (error) {
      setErro('Não foi possível apagar o filme. Tente novamente.');
    } finally {
      setApagando(false);
    }
  }

  const imagemAlternativa =
    'https://placehold.co/600x900/212529/FFFFFF?text=Sem+Poster';

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold mb-2">Apagar filme</h2>

              <p className="text-secondary mb-4">
                Informe o ID para localizar o filme que deseja excluir.
              </p>

              {!filme ? (
                <form onSubmit={procurarFilme}>
                  <div className="mb-3">
                    <label htmlFor="id" className="form-label">
                      ID do filme
                    </label>

                    <input
                      id="id"
                      type="text"
                      className="form-control"
                      placeholder="Digite o ID do filme"
                      value={id}
                      onChange={(event) => setId(event.target.value)}
                      required
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      Procurar
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
              ) : (
                <>
                  <div className="alert alert-warning" role="alert">
                    Confira os dados antes de excluir. Esta operação remove o
                    filme do catálogo.
                  </div>

                  <div className="row g-4 align-items-center mb-4">
                    <div className="col-12 col-sm-5 text-center">
                      <img
                        src={filme.imagem || imagemAlternativa}
                        alt={`Pôster do filme ${filme.nome}`}
                        className="img-fluid rounded shadow-sm"
                        style={{
                          maxHeight: '280px',
                          objectFit: 'contain',
                        }}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = imagemAlternativa;
                        }}
                      />
                    </div>

                    <div className="col-12 col-sm-7">
                      <h4 className="fw-bold">{filme.nome}</h4>

                      <p className="mb-2">
                        <strong>ID:</strong> {filme.id}
                      </p>

                      <p className="mb-2">
                        <strong>Gênero:</strong>{' '}
                        {filme.genero || 'Não informado'}
                      </p>

                      <p className="mb-0">
                        <strong>Ano:</strong> {filme.ano || 'Não informado'}
                      </p>
                    </div>
                  </div>

                  <p>Deseja realmente apagar este filme?</p>

                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={apagarFilme}
                      disabled={apagando}
                    >
                      {apagando ? 'Apagando...' : 'Confirmar exclusão'}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/')}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}

              {erro && (
                <div className="alert alert-danger mt-3" role="alert">
                  {erro}
                </div>
              )}

              {mensagem && (
                <div className="alert alert-success mt-3" role="alert">
                  {mensagem}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApagarFilme;