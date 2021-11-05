import React from 'react';
import {Button, Modal} from 'react-bootstrap';


export default function Popup(props) {
    const {handleClose, deleteItem, product} = props;
    
    return (
        <Modal size="md" show={product.showed} onHide={() => handleClose(product)} centered>
            <Modal.Header closeButton>
            <Modal.Title>Do you want to delete this item?</Modal.Title>
            </Modal.Header>
           
            <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(product)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => deleteItem(product)}>
                Yes
            </Button>
            </Modal.Footer>
        </Modal>
        
    )
}
