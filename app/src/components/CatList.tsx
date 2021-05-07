import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CatList.css';

import { Cat } from '../models/Cat';

const CatList: React.FC<{cats: Cat[]}> = ({children, cats}) => {
    return (
        <div>
            <div className="container">
                {cats.map(cat =>
                    <Card key={cat.image_id}>
                        <Card.Img variant="top" src={cat.image_url} />
                        <Card.Body>
                            <Button variant="primary">View details</Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
            <Button variant="primary">Load more</Button>
        </div>
    );
}

export default CatList;