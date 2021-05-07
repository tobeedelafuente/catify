import React, { useState, useEffect } from 'react';
import './App.css';
import {getBreedsList} from './services/Api';
import {Cat} from './models/Cat';
import Form from 'react-bootstrap/Form';

const App: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [selected, setSelected] = useState<Cat|undefined>(undefined);
  
  useEffect(() => {
      getBreedsList()
        .then(res => setCats(res))
        .catch(err => console.log(err))
  },[]);

  const handleOnChange = (e: any) => {
    const cat = cats.find(c => c.id === e.target.value);
    setSelected(cat);
  }

  return (
    <div className="App">
      <h1>Cat Browser</h1>
      <Form>
        <Form.Group controlId="form">
          <Form.Label>Breed</Form.Label>
          <Form.Control as="select" onChange={handleOnChange}>
            <option>Select breed</option>
            {cats.map(cat => 
              <option value={cat.id} key={cat.id}>{cat.name}</option>
            )}
          </Form.Control>
        </Form.Group>
      </Form>
      <div>
      {selected ? selected.name : "No cats available"}
      </div>
    </div>
  );
}

export default App;
