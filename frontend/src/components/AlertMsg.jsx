import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'

export default function AlertMsg (props) {
  const { alertType, alertContent } = props
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    // if (window.showAlert === true) {
    //   setOpen(true)
    // }
    if (alertType !== 'none') {
      setOpen(true)
    }
  }, [props])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    window.showAlert = false
    setOpen(false)
  }
  const alertPart =
    (alertType && alertType !== 'none')
      ? (
        <Alert
          onClose={handleClose}
          severity={`${alertType}`}
          sx={{ width: '100%' }}
        >
          {alertContent}
        </Alert>
        )
      : (<></>)

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
