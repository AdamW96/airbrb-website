import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import React from 'react'
import fetchFunc from '../services/fetchService'
import { Grid, Button, Typography, Modal, makeStyles } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

function getModalStyle () {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  boldFont: {
    fontWeight: 'bold',
  },
}))

export default function CardBottom (props) {
  const [bookings, setBookings] = React.useState([])
  const [modalStyle] = React.useState(getModalStyle)
  const [openDate, setOpenDate] = React.useState(false)
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [bookingInfo, setBookingInfo] = React.useState(null)
  const [selectStartDate, setSelectStartDate] = React.useState(null)
  const [selectEndDate, setSelectEndDate] = React.useState(null)
  const [confirmStart, setConfirmStart] = React.useState('')
  const [confirmEnd, setConfirmEnd] = React.useState('')
  const styles = useStyles()
  const { fetchData, listingId, listingInfo, setShowAlert, setFetchData } =
    props
  const currentUser = JSON.parse(localStorage.getItem('user'))

  React.useEffect(() => {
    fetchFunc('/bookings', 'GET').then((response) => {
      if (response.status !== 200) {
        return
      }
      response.json().then((data) => {
        setBookings(data.bookings)
      })
    })
  }, [fetchData])

  React.useEffect(() => {
    console.log(bookings)
    let info = null
    for (let i = 0; i < bookings.length; i++) {
      if (
        bookings[i].listingId === listingId &&
        currentUser.email === bookings[i].owner
      ) {
        info = JSON.parse(JSON.stringify(bookings[i], ['id', 'status']))
        break
      }
    }
    setBookingInfo(info)
  }, [bookings])

  const showAlertMsg = (type, content) => {
    setShowAlert({ alertType: type, alertContent: content })
  }

  const changeSecondToDate = (second) => {
    const date = new Date(second)
    const year = date.getFullYear()
    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return `${day}/${month}/${year}`
  }

  const displayDate = () => {
    if (listingInfo.availability.length === 0) {
      return <h5>No available date</h5>
    } else {
      return (
        <React.Fragment>
          {listingInfo.availability.map((ele) => {
            return (
              <Typography key={ele.start}>
                <span className={styles.boldFont}>From</span>
                {` ${changeSecondToDate(ele.start)} `}
                <span className={styles.boldFont}>To</span>
                {` ${changeSecondToDate(ele.end)}`}
              </Typography>
            )
          })}
        </React.Fragment>
      )
    }
  }

  const handleOpenDate = () => {
    setOpenDate(true)
  }

  const handleCloseDate = () => {
    setSelectEndDate(null)
    setSelectStartDate(null)
    setOpenDate(false)
  }

  const handleOpenConfirm = () => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }

  const handleSelectStartDate = (date) => {
    setSelectStartDate(date)
  }

  const handleSelectEndDate = (date) => {
    setSelectEndDate(date)
  }

  const submitBookDate = () => {
    if (!selectStartDate || !selectStartDate) {
      return
    }
    const startTime = selectStartDate.setHours(0, 0, 0, 0)
    const endTime = selectEndDate.setHours(0, 0, 0, 0)
    if (startTime > endTime) {
      showAlertMsg('error', 'Please input right date range')
      return
    }
    if (currentUser.email === listingInfo.owner) {
      showAlertMsg('error', 'Can not book your own list')
      return
    }
    const dateRange = { start: startTime, end: endTime }
    const secondGap = dateRange.end - dateRange.start
    const days = Math.floor(secondGap / (24 * 3600 * 1000)) + 1
    const totalPrice = days * listingInfo.price
    const data = { dateRange, totalPrice }
    fetchFunc(`/bookings/new/${listingId}`, 'POST', data).then(
      (response) => {
        if (response.status === 200) {
          setConfirmStart(`${selectStartDate.getDate()}/${selectStartDate.getMonth() + 1}/${selectStartDate.getFullYear()}`)
          setConfirmEnd(`${selectEndDate.getDate()}/${selectEndDate.getMonth() + 1}/${selectEndDate.getFullYear()}`)
          setFetchData((preState) => !preState)
          handleCloseDate()
          handleOpenConfirm()
        }
      }
    )
  }

  const deleteBook = () => {
    fetchFunc(`/bookings/${bookingInfo.id}`, 'DELETE').then((response) => {
      if (response.status === 200) {
        setFetchData((preState) => !preState)
      }
    })
  }
  const history = useHistory()
  const goReviewPage = (id, listID) => {
    const location = '/review/' + id + '/' + listID;
    history.push(location)
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {!currentUser && <Typography>You must log in frist</Typography>}
          {currentUser && !bookingInfo && (
            <Typography>You must book before comment</Typography>
          )}
          {currentUser && bookingInfo && (
            <React.Fragment>
              <Typography>You have already booked</Typography>
              <Typography>
                {'Booking status: '}
                <span
                  className={styles.boldFont}
                >{`${bookingInfo.status}`}</span>
              </Typography>
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={3}>
          {!currentUser && (
            <Button variant='contained' disabled>
              Book
            </Button>
          )}
          {currentUser && !bookingInfo && (
            <Button
              variant='contained'
              color='primary'
              onClick={handleOpenDate}
            >
              Book
            </Button>
          )}
          {currentUser && bookingInfo && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant='contained' disabled>
                  Already booked
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant='contained' onClick={deleteBook} color='secondary'>
                  Delete
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={3}>
          {!currentUser && (
            <Button variant='contained' disabled>
              Comment
            </Button>
          )}
          {currentUser && !bookingInfo && (
            // 这里先被我改了
            <Button variant='contained' disabled>
              Comment
            </Button>
          )}
          {currentUser && bookingInfo && (
            <Button variant='contained' color='primary' onClick={() => { goReviewPage(bookingInfo.id, listingId) }}>
              Comment
            </Button>
          )}
        </Grid>
      </Grid>
      <Modal
        open={openDate}
        onClose={handleCloseDate}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={styles.paper}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h5'>Choose a book date range</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Available date:</Typography>
              {displayDate()}
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container>
                  <Grid item xs={12}>
                    <KeyboardDatePicker
                      disableToolbar
                      label='Choose start time'
                      variant='inline'
                      format='dd/MM/yyyy'
                      margin='normal'
                      value={selectStartDate}
                      onChange={handleSelectStartDate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <KeyboardDatePicker
                      disableToolbar
                      label='Choose end time'
                      variant='inline'
                      format='dd/MM/yyyy'
                      margin='normal'
                      value={selectEndDate}
                      onChange={handleSelectEndDate}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={submitBookDate}
                  >
                    Book
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleCloseDate}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Modal>

      <Modal
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={styles.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} align='center'>
              <Typography variant='h5'>Confirmation</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>{`Listing title: ${listingInfo.title}`}</Typography>
              <Typography variant='h6'>{`From ${confirmStart} to ${confirmEnd}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                color='primary'
                variant='contained'
                onClick={handleCloseConfirm}
              >
                Ok
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </React.Fragment>
  )
}

CardBottom.propTypes = {
  setFetchData: PropTypes.any,
  fetchData: PropTypes.any,
  setShowAlert: PropTypes.any,
  listingId: PropTypes.string,
  listingInfo: PropTypes.object,
}
