import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CatDetails.css';

import { Cat } from '../models/Cat';

const CatDetails: React.FC<{cat: Cat}> = ({children, cat}) => {
    return (
        <div>
            <Card>
                <Button variant="primary">Back</Button>
                <Card.Img variant="top" src={cat.image_url} />
                <Card.Body>
                    <h4>{cat.name}</h4>
                    <h5>Origin: {cat.origin}</h5>
                    <h6>{cat.temperament}</h6>
                    <p>{cat.description}</p>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CatDetails;