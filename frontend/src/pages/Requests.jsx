import React from 'react'
import fetchFunc from '../services/fetchService'
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
} from '@material-ui/core'
import { useParams } from 'react-router'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(12),
  },
  boldFont: {
    fontWeight: 'bold',
  },
}))

export default function Requests (props) {
  const [postedTime, setPostedTime] = React.useState(null)
  const [listingTitle, setListingTitle] = React.useState(null)
  const [fetchData, setFetchData] = React.useState(false)
  const [bookingList, setBookingList] = React.useState([])
  const [pendingBookings, setPendingBookings] = React.useState([])
  const [historyBookings, setHistoryBookings] = React.useState([])
  const currentUser = JSON.parse(JSON.stringify(localStorage.getItem('user')))
  const { listingId } = useParams()
  const styles = useStyles()
  const { setShowAlert } = props

  const showAlertMsg = (type, content) => {
    setShowAlert({ alertType: type, alertContent: content })
  }

  React.useEffect(() => {
    fetchFunc(`/listings/${listingId}`, 'GET').then((response) => {
      if (response.status !== 200) {
        showAlertMsg('error', 'Can not get listing information from backend')
        return
      }
      response.json().then((data) => {
        console.log(data)
        setPostedTime(data.listing.postedOn)
        setListingTitle(data.listing.title)
      })
    })
  }, [])

  React.useEffect(() => {
    fetchFunc('/bookings', 'GET').then((response) => {
      if (response.status !== 200) {
        showAlertMsg('error', 'Can not get bookings information from backend')
        return
      }
      response.json().then((data) => {
        // add bookings of this listing
        const currentBookings = []
        for (let i = 0; i < data.bookings.length; i++) {
          if (data.bookings[i].listingId === listingId) {
            currentBookings.push(data.bookings[i])
          }
        }
        setBookingList(currentBookings)
      })
    })
  }, [fetchData])

  React.useEffect(() => {
    console.log(bookingList)
    const pendings = []
    const history = []
    for (let i = 0; i < bookingList.length; i++) {
      if (bookingList[i].status === 'pending') {
        pendings.push(bookingList[i])
      } else {
        history.push(bookingList[i])
      }
    }
    setPendingBookings(pendings)
    setHistoryBookings(history)
  }, [bookingList])

  const totalProfit = () => {
    let totalGain = 0
    for (let i = 0; i < bookingList.length; i++) {
      if (bookingList[i].status === 'accepted') {
        totalGain += bookingList[i].totalPrice
      }
    }
    return totalGain
  }

  const onlineTime = () => {
    const nowDate = new Date().getTime()
    const postedDate = new Date(postedTime).getTime()
    const secondGap = nowDate - postedDate
    const days = Math.floor(secondGap / (24 * 3600 * 1000)) + 1
    return days
  }

  const totalDaysBooked = () => {
    let totalDays = 0
    for (let i = 0; i < bookingList.length; i++) {
      if (bookingList[i].status === 'accepted') {
        const days =
          Math.floor(
            (bookingList[i].dateRange.end - bookingList[i].dateRange.start) /
              (24 * 3600 * 1000)
          ) + 1
        totalDays += days
      }
    }
    return totalDays
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

  const acceptRequest = (e) => {
    const bookId = e.currentTarget.name
    fetchFunc(`/bookings/accept/${bookId}`, 'PUT').then(response => {
      if (response.status !== 200) {
        showAlertMsg('error', 'Accept failed')
        return
      }
      showAlertMsg('success', 'Accept successfully')
      setFetchData(preState => !preState)
    })
  }

  const declineRequest = (e) => {
    const bookId = e.currentTarget.name
    fetchFunc(`/bookings/decline/${bookId}`, 'PUT').then(response => {
      if (response.status !== 200) {
        showAlertMsg('error', 'Decline failed')
        return
      }
      showAlertMsg('success', 'Decline successfully')
      setFetchData(preState => !preState)
    })
  }

  const displayPendingBookings = () => {
    return (
      <React.Fragment>
        {pendingBookings.map((ele, index) => {
          console.log(ele)
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Typography>
                    <span className={styles.boldFont}>Request owner: </span>
                    {ele.owner}
                  </Typography>
                  <Typography>
                    <span className={styles.boldFont}>Date range: </span>
                    {`From ${changeSecondToDate(
                      ele.dateRange.start
                    )} to ${changeSecondToDate(ele.dateRange.end)}`}
                  </Typography>
                  <Typography>
                    <span className={styles.boldFont}>Price: </span>
                    {`$${ele.totalPrice}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    name={ele.id}
                    size='small'
                    color='primary'
                    variant='contained'
                    onClick={acceptRequest}
                  >
                    Accept
                  </Button>
                  <Button
                    name={ele.id}
                    size='small'
                    color='secondary'
                    variant='contained'
                    onClick={declineRequest}
                  >
                    Decline
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </React.Fragment>
    )
  }

  const displayHistoryRequests = () => {
    return (
      <React.Fragment>
        {historyBookings.map((ele, index) => {
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Typography>
                    <span className={styles.boldFont}>Request owner: </span>
                    {ele.owner}
                  </Typography>
                  <Typography>
                    <span className={styles.boldFont}>Date range: </span>
                    {`From ${changeSecondToDate(
                      ele.dateRange.start
                    )} to ${changeSecondToDate(ele.dateRange.end)}`}
                  </Typography>
                  <Typography>
                    <span className={styles.boldFont}>Price: </span>
                    {`$${ele.totalPrice}`}
                  </Typography>
                  <Typography>
                    <span className={styles.boldFont}>Status: </span>
                    {`${ele.status}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </React.Fragment>
    )
  }

  return (
    <Container className={styles.container}>
      {!currentUser && (
        <Typography variant='h5'>You must log in first</Typography>
      )}
      {currentUser && !postedTime && (
        <Typography variant='h5'>This listing is not on published</Typography>
      )}
      {currentUser && postedTime && (
        <React.Fragment>
          {bookingList.length === 0 && (
            <Typography variant='h5'>No booking for this list</Typography>
          )}
          {bookingList.length !== 0 && (
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>{`Listing title: ${listingTitle}`}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6'>{`Total profit: $${totalProfit()}`}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6'>{`Total time online: ${onlineTime()} days`}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6'>
                      {`Days are booked in total: ${totalDaysBooked()} days`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='h5' color='primary'>
                      Pending bookings:
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {pendingBookings.length === 0 && (
                      <Typography variant='h6'>
                        No pending booking now
                      </Typography>
                    )}
                    {pendingBookings.length !== 0 && (
                      <Grid container spacing={2}>
                        {/* put all pending bookings in there */}
                        {displayPendingBookings()}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='h5' color='primary'>
                      Request history:
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {historyBookings.length === 0 && (
                      <Typography variant='h6'>No request history</Typography>
                    )}
                    {historyBookings.length !== 0 && (
                      <Grid container spacing={2}>
                        {/* put all request history in there */}
                        {displayHistoryRequests()}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </React.Fragment>
      )}
    </Container>
  )
}

Requests.propTypes = {
  setShowAlert: PropTypes.any,
  setCurrentUser: PropTypes.any,
  currentUser: PropTypes.any,
}
