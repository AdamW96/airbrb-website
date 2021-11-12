import 'date-fns'
import React from 'react'
import { useHistory } from 'react-router'
import {
  Card,
  ImageList,
  ImageListItem,
  CardContent,
  Grid,
  Typography,
  CardActions,
  Button,
  Modal,
  makeStyles,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import HotelIcon from '@material-ui/icons/Hotel'
import BathtubIcon from '@material-ui/icons/Bathtub'
import PropTypes from 'prop-types'
import fetchFunc from '../services/fetchService'

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
  icons: {
    paddingRight: theme.spacing(2),
  },
  gridContainer: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  boldFont: {
    fontWeight: 'bold',
  },
}))

const checkImageOrVedio = (thumbnail) => {
  return thumbnail.startsWith('data:image')
}

const getAllImage = (thumbnail) => {
  const allIMage = thumbnail.split(' ')
  allIMage.pop()
  return allIMage
}

export default function HostedList (props) {
  const { lists, setShowAlert, setFetchData } = props
  const styles = useStyles()
  const history = useHistory()
  const [modalStyle] = React.useState(getModalStyle)
  const [currentListId, setCurrentListId] = React.useState('')
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [openDateModal, setOpenDateModal] = React.useState(false)
  const [openUnPublishModal, setOpenUnPublishModal] = React.useState(false)
  const [startTime, setStartTime] = React.useState(null)
  const [endTime, setEndTime] = React.useState(null)
  const [timeRanges, setTimeRanges] = React.useState([])

  React.useEffect(() => {
    console.log(startTime)
  }, [startTime])

  React.useEffect(() => {
    console.log(timeRanges)
  }, [timeRanges])

  const showAlertMsg = (type, content) => {
    setShowAlert({ alertType: type, alertContent: content })
  }

  const handleOpenDeleteModal = (e) => {
    setCurrentListId(e.currentTarget.name)
    setOpenDeleteModal(true)
  }
  const handleColseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const handleOpenDateModal = (e) => {
    setCurrentListId(e.currentTarget.name)
    setOpenDateModal(true)
  }

  const handleCloseOpenDateModal = () => {
    setStartTime(null)
    setEndTime(null)
    setTimeRanges([])
    setOpenDateModal(false)
  }

  const handleOpenUnPublishModal = (e) => {
    setCurrentListId(e.currentTarget.name)
    setOpenUnPublishModal(true)
  }
  const handleCloseUnPublishModal = () => {
    setOpenUnPublishModal(false)
  }

  const handleStartTimeChange = (data) => {
    setStartTime(data)
  }

  const handleEndTimeChange = (data) => {
    setEndTime(data)
  }

  const submitDelete = () => {
    fetchFunc(`/listings/${currentListId}`, 'DELETE').then((response) => {
      if (response.status !== 200) {
        showAlertMsg('error', "Can't delete this list")
        return
      }
      showAlertMsg('success', 'Delete successfully')
      setFetchData((preState) => !preState)
      setOpenDeleteModal(false)
    })
  }

  const calculateBeds = (ele) => {
    if (ele.metadata.bedRooms.length === 0) {
      return <span>0 bed</span>
    }
    let numberOfBeds = 0
    ele.metadata.bedRooms.forEach((room) => {
      numberOfBeds += parseInt(room.bedsNumber)
    })
    return <span>{numberOfBeds} beds</span>
  }

  const insertDate = () => {
    if (!startTime || !endTime) {
      return
    }
    const startSeconds = startTime.getTime()
    const endSeconds = endTime.getTime()
    if (startSeconds > endSeconds) {
      showAlertMsg('error', 'Start date must earler than end date')
      return
    }
    const newDate = { start: startSeconds, end: endSeconds }
    const sortList = []
    let startIndex = 0
    let endIndex = 0
    if (timeRanges.length === 0) {
      setTimeRanges([newDate])
    } else {
      timeRanges.forEach((ele) => {
        sortList.push(ele.start)
        sortList.push(ele.end)
      })
      for (let start = 0; start < sortList.length; start++) {
        if (startSeconds <= sortList[start]) {
          startIndex = start
          break
        }
        if (start === sortList.length - 1) {
          startIndex = sortList.length
        }
      }
      sortList.splice(startIndex, 0, startSeconds)
      for (let end = 0; end < sortList.length; end++) {
        if (endSeconds < sortList[end]) {
          endIndex = end
          break
        }
        if (end === sortList.length - 1) {
          endIndex = sortList.length
        }
      }
      sortList.splice(endIndex, 0, endSeconds)
      const firstPart = sortList.slice(0, startIndex)
      const secondPart = sortList.slice(endIndex + 1)
      if (firstPart.length % 2 === 1) {
        newDate.start = firstPart.pop()
      }
      if (secondPart.length % 2 === 1) {
        newDate.end = secondPart.shift()
      }
      const newDateRanges = []
      for (let i = 0; i < firstPart.length; i += 2) {
        const date = { start: firstPart[i], end: firstPart[i + 1] }
        newDateRanges.push(date)
      }
      newDateRanges.push(newDate)
      for (let i = 0; i < secondPart.length; i += 2) {
        const date = { start: secondPart[i], end: secondPart[i + 1] }
        newDateRanges.push(date)
      }
      setTimeRanges(newDateRanges)
    }
    showAlertMsg(
      'success',
      'Add date successfully, you can add more date range'
    )
    setStartTime(null)
    setEndTime(null)
  }
  const changeSecondToDate = (second) => {
    const date = new Date(second)
    const year = date.getFullYear()
    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    console.log(`${day}/${month}/${year}`)
    return `${day}/${month}/${year}`
  }
  const displayDate = () => {
    if (timeRanges.length === 0) {
      return <h5>No available date</h5>
    } else {
      return (
        <React.Fragment>
          {timeRanges.map((ele) => {
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
  const showPublishedDate = (ele) => {
    if (ele.availability.length === 0) {
      return <Typography>No publish date</Typography>
    } else {
      return (
        <React.Fragment>
          <Typography variant='h5'>Avaliable dates:</Typography>
          {ele.availability.map((date) => {
            return (
              <Typography key={ele.start}>
                <span className={styles.boldFont}>From</span>
                {` ${changeSecondToDate(date.start)} `}
                <span className={styles.boldFont}>To</span>
                {` ${changeSecondToDate(date.end)}`}
              </Typography>
            )
          })}
        </React.Fragment>
      )
    }
  }

  const publishList = () => {
    if (timeRanges.length === 0) {
      showAlertMsg('error', 'You must choose one or more dates to publish')
      return
    }
    const data = { availability: [...timeRanges] }
    fetchFunc(`/listings/publish/${currentListId}`, 'PUT', data).then(
      (response) => {
        if (response.status !== 200) {
          showAlertMsg('error', "Can't publish this list")
          return
        }
        showAlertMsg('success', 'Publish this list successfully')
        setFetchData((preState) => !preState)
        handleCloseOpenDateModal()
      }
    )
  }

  const submitUnpublish = () => {
    fetchFunc(`/listings/unpublish/${currentListId}`, 'PUT').then(response => {
      if (response.status !== 200) {
        showAlertMsg('error', 'Something wrong')
        return
      }
      showAlertMsg('success', 'unpublish this list successfully!')
      setFetchData((preState) => !preState)
      handleCloseUnPublishModal()
    })
  }

  const jumpToEdit = (e) => {
    history.push(`/edit/${e.currentTarget.name}`)
  }

  return (
    <React.Fragment>
      {lists.length === 0 && <Typography>No authority or no data</Typography>}
      {lists.length !== 0 && (
        <Grid container spacing={3}>
          {lists.map((ele, index) => {
            return (
              <Grid item key={ele.id} className={styles.item} xs={12} sm={6}>
                <Card sx={{ maxWidth: 345 }}>
                  {checkImageOrVedio(ele.thumbnail) && (
                    <div className={styles.root}>
                      <ImageList className={styles.imageList} cols={1}>
                        {getAllImage(ele.thumbnail).map((imageBase64) => {
                          return (
                            <ImageListItem key={imageBase64}>
                              <img src={imageBase64} alt='Image of listings' />
                            </ImageListItem>
                          )
                        })}
                      </ImageList>
                    </div>
                  )}
                  {!checkImageOrVedio(ele.thumbnail) && (
                    <div style={{ textAlign: 'center' }}>
                      <iframe
                        width='420'
                        height='315'
                        textalign='center'
                        title='YouTube video player'
                        src={ele.thumbnail}
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  <CardContent>
                    <Grid container className={styles.gridContainer}>
                      <Grid item xs={4}>
                        <Typography
                          variant='body2'
                          color='textPrimary'
                          align='center'
                        >
                          <span className={styles.boldFont}>Title:</span>
                          {` ${ele.title}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant='body2'
                          color='textPrimary'
                          align='center'
                        >
                          <span className={styles.boldFont}>Price:</span>
                          {` $${ele.price} per night`}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant='body2'
                          color='textPrimary'
                          align='center'
                        >
                          <span className={styles.boldFont}>
                            Property type:
                          </span>
                          {ele.metadata.entirePlace ? ' Entire place' : null}
                          {ele.metadata.privateRoom ? ' Private room' : null}
                          {ele.metadata.shareRoom ? ' Share room' : null}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant='body2'
                          color='textPrimary'
                          align='center'
                        >
                          <span className={styles.boldFont}>Street:</span>
                          {` ${ele.address.street} `}
                          <span className={styles.boldFont}>City:</span>
                          {` ${ele.address.city} `}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant='body2'
                          color='textPrimary'
                          align='center'
                        >
                          <span className={styles.boldFont}>State:</span>
                          {` ${ele.address.state} `}
                          <span className={styles.boldFont}>Postcode:</span>
                          {` ${ele.address.postcode} `}
                          <span className={styles.boldFont}>Country:</span>
                          {` ${ele.address.country} `}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container className={styles.gridContainer}>
                      <Grid item xs={6} align='center' className={styles.item}>
                        <HotelIcon className={styles.icons} />
                        {calculateBeds(ele)}
                      </Grid>
                      <Grid item xs={6} align='center' className={styles.item}>
                        <BathtubIcon className={styles.icons} />
                        {`${ele.metadata.bathRoomNumber} bathrooms`}
                      </Grid>
                    </Grid>
                    <Grid container className={styles.gridContainer}>
                      <Grid item>{'Total reviews'}</Grid>
                    </Grid>
                    <Grid container className={styles.gridContainer}>
                      <Grid item xs={12}>
                        {!ele.published && (
                          <Typography>Not published</Typography>
                        )}
                        {ele.published && showPublishedDate(ele)}
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button size='large' color='primary' name = {ele.id} onClick={jumpToEdit}>
                      Edit
                    </Button>
                    <Button
                      size='large'
                      color='secondary'
                      name={ele.id}
                      onClick={handleOpenDeleteModal}
                    >
                      Delete
                    </Button>
                    {ele.published && (
                      <Button
                        size='large'
                        color='secondary'
                        name = {ele.id}
                        onClick={handleOpenUnPublishModal}
                      >
                        Unpublish
                      </Button>
                    )}
                    {!ele.published && (
                      <Button
                        name={ele.id}
                        size='large'
                        color='primary'
                        onClick={handleOpenDateModal}
                      >
                        Publish
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}
      <Modal
        open={openDeleteModal}
        onClose={handleColseDeleteModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={styles.paper}>
          <h3>Do you want to delete this list?</h3>
          <Button size='large' color='primary' onClick={submitDelete}>
            Yes
          </Button>
          <Button
            size='large'
            color='secondary'
            onClick={handleColseDeleteModal}
          >
            No
          </Button>
        </div>
      </Modal>

      <Modal
        open={openUnPublishModal}
        onClose={handleCloseUnPublishModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={styles.paper}>
          <h3>Do you want to unpublish this list?</h3>
          <Button size='large' color='primary' onClick={submitUnpublish}>
            Yes
          </Button>
          <Button
            size='large'
            color='secondary'
            onClick={handleCloseUnPublishModal}
          >
            No
          </Button>
        </div>
      </Modal>

      <Modal
        open={openDateModal}
        onClose={handleCloseOpenDateModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={styles.paper}>
          <h3>Choose time range to live</h3>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant='inline'
                    format='dd/MM/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='Choose Start Date'
                    value={startTime}
                    onChange={handleStartTimeChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant='inline'
                    format='dd/MM/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='Choose End Date'
                    value={endTime}
                    onChange={handleEndTimeChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
          <Grid container>
            <Grid item xs={12}>
              <Button size='large' color='primary' onClick={insertDate}>
                Add Date
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography>Available date:</Typography>
              {displayDate()}
            </Grid>
            <Grid item xs={6}>
              <Button size='large' color='primary' onClick={publishList}>
                Publish
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                size='large'
                color='secondary'
                onClick={handleCloseOpenDateModal}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </React.Fragment>
  )
}

HostedList.propTypes = {
  lists: PropTypes.any,
  setShowAlert: PropTypes.any,
  setFetchData: PropTypes.any,
}
