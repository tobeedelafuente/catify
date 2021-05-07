import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CatDetails.css';

import { getCat } from '../services/Api';
import { Cat } from '../models/Cat';

import {  useParams, useHistory } from "react-router-dom";

const CatDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const [cat, setCat] = useState<Cat|undefined>(undefined);
    const [loading, setLoading] = useState(true)

    let history = useHistory();

    useEffect(() => {
        getCat(slug)
          .then(res => {
            setCat(res);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setCat(undefined);
            setLoading(false);
          });
    },[slug]);

    return (
        <div>
            {!loading ? 
                <div>
                    {cat && !loading ?
                        <Card>
                            <Button variant="primary"  onClick={() => {history.push(`/?breed=${cat.id}`)}}>Back</Button>
                            <Card.Img variant="top" src={cat.image_url} />
                            <Card.Body>
                                <h4>{cat.name}</h4>
                                <h5>Origin: {cat.origin}</h5>
                                <h6>{cat.temperament}</h6>
                                <p>{cat.description}</p>
                            </Card.Body>
                        </Card>
                    :
                    <div>Apologies but we could not load new cats for you at this time! Miau!</div>
                    }
                </div>
            :
            null
            }
        </div>
    );
}

export default CatDetails;