import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'

export default function AlertMsg (props) {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (window.showAlert) {
      setOpen(true)
    }
  }, [window.showAlert])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    window.showAlert = false
    setOpen(false)
  }
  const alertPart =
    props.alertType === 'none'
      ? (<></>)
      : (
      <Alert
        onClose={handleClose}
        severity={`${props.alertType}`}
        sx={{ width: '100%' }}
      >
        {props.alertContent}
      </Alert>
        )

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        key={'top' + 'center'}
      >
        {alertPart}
      </Snackbar>
    </React.Fragment>
  )
}

AlertMsg.propTypes = {
  alertType: PropTypes.string,
  alertContent: PropTypes.string,
}
