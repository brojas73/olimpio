import { Alert } from 'react-bootstrap'

const AlertAutoHide = ({show, message, variant, dismissible}) => {
  return (
    <>
        <Alert show={show} variant={variant} dismissible={dismissible}>{message}</Alert>
    </>
  )
}

export default AlertAutoHide
