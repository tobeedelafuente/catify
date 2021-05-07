import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CatList.css';

import { Cat } from '../models/Cat';

type CatListProps = {
    cats: Cat[];
    showLoad: boolean;
    onLoadMore: () => void;
}

const CatList: React.FC<CatListProps> = ({children, cats, showLoad, onLoadMore}) => {
    return (
        <div>
            <div className="container">
                {cats.map(cat =>
                    <Card className="cat-card" key={cat.image_id}>
                        <Card.Img variant="top" src={cat.image_url} />
                        <Card.Body className="cat-card-body">
                            <Button variant="primary">View details</Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
            {showLoad ? 
                <Button variant="success" onClick={onLoadMore}>Load more</Button>
                :
                null
            }
            {children}
        </div>
    );
}

export default CatList;