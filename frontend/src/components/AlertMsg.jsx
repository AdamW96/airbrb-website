import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types'

export default function AlertMsg (props) {
  console.log('coming to alert msg', props)
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    console.log('coming alert effect')
    if (window.showAlert) {
      setOpen(true)
    }
  })
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
    window.showAlert = false
    console.log('finish show, showalert = false', window.showAlert)
  }
  const alertPart = (
    <Alert onClose={handleClose} severity={`${props.alertType}`} sx={{ width: '100%' }}>
      {props.alertContent}
    </Alert>
  )

  console.log(alertPart)
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        key={'top' + 'center'}
      >
        {alertPart}
      </Snackbar>
    </React.Fragment>
  )
}

AlertMsg.propTypes = {
  alertContent: PropTypes.string,
  alertType: PropTypes.string,
}
