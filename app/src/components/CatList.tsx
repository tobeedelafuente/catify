import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CatList.css';

import { Cat } from '../models/Cat';

import { useHistory } from "react-router-dom";

type CatListProps = {
    cats: Cat[];
    showLoad: boolean;
    onLoadMore: () => void;
}

const CatList: React.FC<CatListProps> = ({children, cats, showLoad, onLoadMore}) => {
    let history = useHistory();

    return (
        <div>
            <div className="cat-list-container">
                {cats.map(cat =>
                    <Card className="cat-list-card" key={cat.image_id}>
                        <Card.Img variant="top" src={cat.image_url} />
                        <Card.Body className="cat-list-card-body">
                            <Button variant="primary" onClick={() => {history.push(`/${cat.image_id}`)}}>View details</Button>
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