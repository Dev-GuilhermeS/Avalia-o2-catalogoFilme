import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cabecalho from './componentes/Cabecalho';
import Inicio from './paginas/Inicio';
import LerFilme from './paginas/LerFilme';
import CriarFilme from './paginas/CriarFilme';
import AlterarFilme from './paginas/AlterarFilme';
import ApagarFilme from './paginas/ApagarFilme';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Cabecalho />

        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/ler/:id" element={<LerFilme />} />
            <Route path="/criar" element={<CriarFilme />} />
            <Route path="/alterar" element={<AlterarFilme />} />
            <Route path="/apagar" element={<ApagarFilme />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;