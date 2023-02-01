import { Modal, Button } from 'react-bootstrap'
import React from 'react'

const IdleTimeoutModal = ({showModal, handleContinue, handleLogout, remainingTime}) => {
    return (
        <Modal show={showModal} onHide={handleContinue}>
            <Modal.Header closeButton>
                <Modal.Title>Sin Actividad</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tu sesión expiró. ¿Quieres continuar con la sesión?</Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={handleLogout}>Salir</Button>
                <Button variant='primary' onClick={handleContinue}>Continuar Sesión</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default IdleTimeoutModal
