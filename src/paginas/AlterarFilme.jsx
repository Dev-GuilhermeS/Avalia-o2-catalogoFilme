import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../servicos/api';

function AlterarFilme() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [filme, setFilme] = useState(null);
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [ano, setAno] = useState('');
  const [imagem, setImagem] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function procurarFilme(event) {
    event.preventDefault();

    setErro('');
    setMensagem('');
    setFilme(null);

    if (!id.trim()) {
      setErro('Informe o ID do filme.');
      return;
    }

    try {
      const resposta = await api.get(`/${id.trim()}`);

      setFilme(resposta.data);
      setNome(resposta.data.nome || '');
      setGenero(resposta.data.genero || '');
      setAno(resposta.data.ano || '');
      setImagem(resposta.data.imagem || '');
    } catch (error) {
      setErro('Filme não encontrado. Verifique o ID informado.');
    }
  }

  async function alterarFilme(event) {
    event.preventDefault();

    setErro('');
    setMensagem('');
    setSalvando(true);

    try {
      await api.put(`/${filme.id}`, {
        nome,
        genero,
        ano,
        imagem,
      });

      setMensagem('Filme alterado com sucesso!');
      setFilme(null);
      setId('');
      setNome('');
      setGenero('');
      setAno('');
      setImagem('');
    } catch (error) {
      setErro('Não foi possível alterar o filme. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold mb-2">Alterar filme</h2>

              <p className="text-secondary mb-4">
                Informe o ID para localizar o filme que deseja editar.
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
                <form onSubmit={alterarFilme}>
                  <div className="alert alert-info">
                    Editando o filme de ID <strong>{filme.id}</strong>.
                  </div>

                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">
                      Nome do filme
                    </label>

                    <input
                      id="nome"
                      type="text"
                      className="form-control"
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
                      min="1888"
                      max="2100"
                      className="form-control"
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
                  </div>

                  {imagem.trim() && (
                    <div className="mb-4 text-center">
                      <p className="fw-semibold">Prévia do pôster</p>

                      <img
                        src={imagem}
                        alt="Prévia do pôster do filme"
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

                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={salvando}
                    >
                      {salvando ? 'Salvando...' : 'Salvar alterações'}
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

export default AlterarFilme;