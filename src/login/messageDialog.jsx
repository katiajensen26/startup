import React from 'react';

import { NavButton } from '../app';
import Modal from 'react-bootstrap/Modal';

export function MessageDialog(props) {
    return (
        <Modal {...props} show={props.message} centered>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
                <NavButton onClick={props.onHide}>Close</NavButton>
            </Modal.Footer>
        </Modal>
    )
}