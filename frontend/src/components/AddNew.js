import {
  Fab,
  makeStyles,
  Tooltip,
  Modal,
  Container,
  TextField,
} from '@material-ui/core'
// import { Person } from '@material-ui/icons';
import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add'

const useStyle = makeStyles((theme) => ({
  addButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    height: 80,
    width: 80,
  },
  modalContainer: {
    padding: theme.spacing(5),
    width: 500,
    height: 550,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
      height: '60vh',
    },
  },
  item: {
    marginBottom: 20
  },
  text: {
    width: '100%'
  }
}))
function AddNew () {
  const styles = useStyle()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <React.Fragment>
      <Tooltip
        title='Add new house'
        className={styles.addButton}
        onClick={handleOpen}
      >
        <Fab color='secondary'>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Container className={styles.modalContainer}>
          <form className={styles.form} autoComplete='off'>
            <div className={styles.item}>
              <TextField
                id='standard-basic'
                label='Title'
                variant='outlined'
                size='small'
                className = {styles.text}
              />
            </div>
            <div className={styles.item}>
              <TextField
                id='outlined-multiline-static'
                label='Description'
                multiline
                rows={4}
                defaultValue='description of your house'
                variant='outlined'
                size = 'small'
                className = {styles.text}
              />
            </div>
          </form>
        </Container>
      </Modal>
    </React.Fragment>
  )
}

export default AddNew
