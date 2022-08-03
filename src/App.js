import { useState } from 'react';
import './styles.css';
import { FcSearch } from 'react-icons/fc';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      return alert('Preencha algum CEP!');
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data);
      setInput('');
    } catch {
      alert('Ops, erro ao buscar.');
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="number"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
            <FcSearch size={25} />
        </button>
      </div>

      {Object.keys(cep).length > 0 && 
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>DDD: {cep.ddd}</span>
          <span>{cep.bairro}</span>
          <span>{`${cep.localidade} - ${cep.uf}`}</span>
        </main>
      }

    </div>
  );
}

export default App;
