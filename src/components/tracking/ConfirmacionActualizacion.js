import { Button, Modal } from 'react-bootstrap'

const ConfirmacionActualizacion = ({title, body, onContinuar, show, setShow}) => {
  function handleCancelar() {
    setShow(false)
  }

  function handleContinuar() {
    setShow(false)
    onContinuar()
  }

  return (
    <Modal show={show} onHide={handleCancelar} backdrop="static">
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelar}>Cancelar</Button>
            <Button variant="primary" onClick={handleContinuar}>Confirmar</Button>
        </Modal.Footer>
    </Modal> 
  )
}

export default ConfirmacionActualizacion
