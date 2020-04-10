import React, {useState, useEffect} from "react";

import api from 'services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {

    const data = {
      title: `Novo repository ${Date.now()}`, 
      url: `http:www.teste${Date.now()}.com`, 
      techs:['react', 'nodejs','react-native'],  
    };
    
    const response = await api.post('repositories', data);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      
      setRepositories(repositories.filter(repository => repository.id !== id));
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => (
            <li key={item.id}>
              {item.title}

              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
