import React, {useState, useEffect} from 'react';
import './App.css';
import {getBreedsList, getBreedImages} from './services/Api';
import {Cat} from './models/Cat';
import Form from 'react-bootstrap/Form';
import CatList from './components/CatList';
import CatDetails from './components/CatDetails';

const App: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [selected, setSelected] = useState<Cat|undefined>(undefined);
  const [page, setPage] = useState(1);
  const [canLoad, setCanLoad] = useState(true);
  const [catImages, setCatImages] = useState<Cat[]>([]);
  
  useEffect(() => {
      getBreedsList()
        .then(res => setCats(res))
        .catch(err => console.log(err))
  },[]);

  const handleOnChange = (e: any) => {
    const cat: Cat|undefined = cats.find(c => c.id === e.target.value);
    if (cat) {
      getBreedImages(cat.id, 1)
        .then(res => setCatImages(res))
        .catch(err => console.log(err));
    }
    setPage(1);
    setSelected(cat);
    setCanLoad(true);
  }

  const onLoadMore = () => {
    if (selected) {
      getBreedImages(selected.id, page + 1)
        .then(res => {
          const temp: Cat[] = [...catImages];
          let found = false;

          for (const cat of res) {
            if (!catImages.find(c => c.image_id === cat.image_id)) {
              temp.push(cat);
              found = true;
            }
          }

          setCatImages(temp);
          setCanLoad(found);
        })
        .catch(err => console.log(err));
      setPage(page + 1);
    }
  }

  const renderCatList = () => {
    if (selected) {
      return (
        <CatList cats={catImages} showLoad={canLoad} onLoadMore={() => onLoadMore()}/>
      );
    } else {
      return <div>No cats available</div>
    }
  }

  const renderSelected = () => {
    if (selected) {
      return (
        <CatDetails cat={selected}/>
      );
    }
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
      {renderCatList()}
      </div>
    </div>
  );
}

export default App;
