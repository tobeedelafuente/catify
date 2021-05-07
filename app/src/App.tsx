import React, { useState, useEffect } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import CatList from './components/CatList';

import { getBreedsList, getBreedImages } from './services/Api';
import { Cat } from './models/Cat';

import {  useLocation } from "react-router-dom";

const App: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [selected, setSelected] = useState<Cat|undefined>(undefined);
  const [page, setPage] = useState(1);
  const [canLoad, setCanLoad] = useState(true);
  const [catImages, setCatImages] = useState<Cat[]>([]);

  const { search } = useLocation();
  const match = search.match(/breed=(.*)/);
  let type = match?.[1];
  
  useEffect(() => {
    getBreedsList()
      .then(res => {
        setCats(res);

        if (type) {
          doSelection(type, res);
        }
      })
      .catch(err => {
        console.log(err)
        alert("Apologies but we could not load new cats for you at this time! Miau!");
      })
  }, []);

  /**
   * handleOnChange handles the onChange event of the select tag for the breeds.
   * @param e event parameter of the onChange event.
   */
  const handleOnChange = (e: any) => {
    const id = e.target.value;
    doSelection(id, cats);
  }

  /**
   * doSelection handles the event when the user selects a breed from the list or when the user
   * comes back from the Cat Details page.
   * @param id the breed id (ex. abys for Abyssinian).
   * @param arr the list of cats acquired from the breeds endpoint.
   */
  const doSelection = (id: string, arr: Cat[]) => {
    const cat: Cat|undefined = arr.find(c => c.id === id);
    if (cat) {
      getBreedImages(cat.id, 1)
        .then(res => setCatImages(res))
        .catch(err => console.log(err));
    } else {
      alert("Apologies but we could not load new cats for you at this time! Miau!");
    }
    setPage(1);
    setSelected(cat);
    setCanLoad(true);
  }

  /**
   * onLoadMore handles the event when the user clicks on the Load More button.
   */
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

  return (
    <div className="App">
      <h1>Cat Browser</h1>
      <Form>
        <Form.Group controlId="form">
          <Form.Label>Breed</Form.Label>
          <Form.Control as="select" onChange={handleOnChange} value={selected?.id || type}>
            <option>Select breed</option>
            {cats.map(cat => 
              <option value={cat.id} key={cat.id}>{cat.name}</option>
            )}
          </Form.Control>
        </Form.Group>
      </Form>
      <div>
        {selected ?
          <CatList cats={catImages} showLoad={canLoad} onLoadMore={() => onLoadMore()}/>
          :
          <div>No cats available</div>
        }
      </div>
    </div>
  );
}

export default App;
