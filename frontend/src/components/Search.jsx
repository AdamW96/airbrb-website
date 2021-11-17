import React from 'react'
import fetchFunc from '../services/fetchService'
import {
  Button,
  Modal,
  Grid,
  Typography,
  TextField,
  makeStyles,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '30%',
    height: '80%',
    color: 'white',
  },
  searchIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    width: 300,
    height: 600,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

export default function Search (props) {
  const styles = useStyles()
  const history = useHistory()
  const [open, setOpen] = React.useState(false)
  const [searchTitle, setSearchTitle] = React.useState('')
  const [searchCity, setSearchCity] = React.useState('')
  const [startTime, setStartTime] = React.useState(0)
  const [endTime, setEndTime] = React.useState(0)
  const [bedsMinNumber, setBedsMinNumber] = React.useState('')
  const [bedsMaxNumber, setBedsMaxNumber] = React.useState('')
  const [minPrice, setMinPrice] = React.useState('')
  const [maxPrice, setMaxPrice] = React.useState('')
  const [minRating, setMinRating] = React.useState('')
  const [maxRating, setMaxRating] = React.useState('')
  const { setSearchResList } = props

  const initSearchContent = () => {
    setSearchTitle('')
    setSearchCity('')
    setStartTime(0)
    setEndTime(0)
    setBedsMinNumber('')
    setBedsMaxNumber('')
    setMinPrice('')
    setMaxPrice('')
    setMinRating('')
    setMaxRating('')
  }

  const hasString = (str) => {
    if (str.length === 0) return false
    if (str.replace(' ', '').length === 0) return false
    return true
  }

  const calculateBeds = (bedRooms) => {
    if (bedRooms.length === 0) return 0
    else {
      let number = 0;
      for (let i = 0; i < bedRooms.length; i++) {
        number += parseInt(bedRooms[i].bedsNumber)
      }
      return number
    }
  }

  const checkTimeValid = (availability, time, type) => {
    if (type === 'start') {
      for (let i = 0; i < availability.length; i++) {
        if (availability[i].start <= time) return true
      }
      return false
    } else {
      for (let i = 0; i < availability.length; i++) {
        if (availability[i].end >= time) return true
      }
      return false
    }
  }

  const calculateRating = (reviews) => {
    let number = 0
    if (reviews.length === 0) return number
    for (let i = 0; i < reviews.length; i++) {
      number += reviews[i].score
    }
    number = Math.floor(number / (reviews.length))
    return number
  }

  const handleOpen = () => {
    initSearchContent()
    setOpen(true)
  }

  const handleClose = () => {
    initSearchContent()
    setOpen(false)
  }

  const handleChangeStartDate = (e) => {
    const data = new Date(e.target.value)
    setStartTime(data.setHours(0, 0, 0, 0))
  }
  const handleChangeEndDate = (e) => {
    const data = new Date(e.target.value)
    setEndTime(data.setHours(0, 0, 0, 0))
  }
  const searchResult = (list) => {
    console.log(
      searchTitle,
      searchCity,
      startTime,
      endTime,
      bedsMinNumber,
      bedsMaxNumber,
      minPrice,
      maxPrice,
      minRating,
      maxRating
    )
    if (hasString(searchTitle)) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].title !== searchTitle) {
          list.splice(i, 1)
          i--
        }
      }
    }
    if (hasString(searchCity)) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].address.city !== searchCity) {
          list.splice(i, 1)
          i--
        }
      }
    }
    if (hasString(bedsMinNumber)) {
      for (let i = 0; i < list.length; i++) {
        if (parseInt(bedsMinNumber) > calculateBeds(list[i].metadata.bedRooms)) {
          list.splice(i, 1)
          i--
        }
      }
    }
    if (hasString(bedsMaxNumber)) {
      for (let i = 0; i < list.length; i++) {
        if (parseInt(bedsMaxNumber) < calculateBeds(list[i].metadata.bedRooms)) {
          list.splice(i, 1)
          i--
        }
      }
    }
    if (!isNaN(startTime) && startTime > 0) {
      for (let i = 0; i < list.length; i++) {
        if (!checkTimeValid(list[i].availability, startTime, 'start')) {
          list.splice(i, 1)
          i--
        }
      }
    }
    if (!isNaN(endTime) && endTime > 0) {
      for (let i = 0; i < list.length; i++) {
        if (!checkTimeValid(list[i].availability, endTime, 'end')) {
          list.splice(i, 1)
          i--
        }
      }
    }
    if (hasString(minPrice)) {
      for (let i = 0; i < list.length; i++) {
        console.log(list[i].price, minPrice)
        if (parseInt(list[i].price) < parseInt(minPrice)) {
          list.splice(i, 1)
          i--
        }
      }
    }
    if (hasString(maxPrice)) {
      for (let i = 0; i < list.length; i++) {
        if (parseInt(list[i].price) > parseInt(maxPrice)) {
          list.splice(i, 1)
          i--
        }
      }
    }
    if (hasString(minRating)) {
      for (let i = 0; i < list.length; i++) {
        if (calculateRating(list[i].reviews) < parseInt(minRating)) {
          list.splice(i, 1)
          i--
        }
      }
    }
    if (hasString(maxRating)) {
      for (let i = 0; i < list.length; i++) {
        if (calculateRating(list[i].reviews) > parseInt(minRating)) {
          list.splice(i, 1)
          i--
        }
      }
    }
    return list
  }

  const submitSearch = () => {
    fetchFunc('/listings', 'GET').then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          const searchList = []
          const allListings = data.listings
          let index = 0
          for (let i = 0; i < allListings.length; i++) {
            fetchFunc(`/listings/${allListings[i].id}`, 'GET').then(response => {
              if (response.status === 200) {
                response.json().then(data => {
                  index += 1
                  if (data.listing.published) {
                    data.listing.id = allListings[i].id
                    searchList.push(data.listing)
                  }
                  if (index === allListings.length) {
                    const res = searchResult(searchList)
                    setSearchResList(res)
                    handleClose()
                    history.push('/searchResult')
                  }
                })
              } else {
                index += 1
                if (index === allListings.length) {
                  const res = searchResult(searchList)
                  setSearchResList(res)
                  handleClose()
                  history.push('/searchResult')
                }
              }
            })
          }
        })
      }
    })
  }
  return (
    <React.Fragment>
      <Button className={styles.container} onClick={handleOpen}>
        <SearchIcon className={styles.searchIcon} />
        Search
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className={styles.paper}>
          <Typography variant='h4' align='center'>
            Search box
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} align='center'>
                  <Typography variant='h5' color='primary'>
                    City and Title:
                  </Typography>
                  <TextField
                    style={{ marginBottom: '1rem' }}
                    id='inputTitle'
                    variant='outlined'
                    label='Search Title'
                    onChange={(e) => {
                      setSearchTitle(e.target.value)
                    }}
                  />
                  <TextField
                    id='inputTitle'
                    variant='outlined'
                    label='Search City'
                    onChange={(e) => {
                      setSearchCity(e.target.value)
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} align='center'>
                  <Typography variant='h5' color='primary'>
                    Other search options:
                  </Typography>
                </Grid>
                <Grid item xs={12} name='Number of beds' align='center'>
                  <Typography>Beds number:</Typography>
                  <TextField
                    style={{ marginBottom: '1rem' }}
                    label='Min number'
                    variant='outlined'
                    type='number'
                    onChange={(e) => {
                      setBedsMinNumber(e.target.value)
                    }}
                  />
                  <TextField
                    label='Max number'
                    variant='outlined'
                    type='number'
                    onChange={(e) => {
                      setBedsMaxNumber(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} name='Date range' align='center'>
                  <Typography>Date range:</Typography>
                  <TextField
                    style={{ marginBottom: '1rem' }}
                    label='Start date'
                    type='date'
                    onChange={handleChangeStartDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    label='End date'
                    type='date'
                    onChange={handleChangeEndDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} name='Price' align='center'>
                  <Typography>Price range:</Typography>
                  <TextField
                    style={{ marginBottom: '1rem' }}
                    label='Min price'
                    variant='outlined'
                    type='number'
                    onChange={(e) => {
                      setMinPrice(e.target.value)
                    }}
                  />
                  <TextField
                    label='Max price'
                    variant='outlined'
                    type='number'
                    onChange={(e) => {
                      setMaxPrice(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} name='Ratings' align='center'>
                  <Typography>Rating range(from 0-5):</Typography>
                  <TextField
                    style={{ marginBottom: '1rem' }}
                    label='Min rating'
                    variant='outlined'
                    type='number'
                    onChange={(e) => {
                      setMinRating(e.target.value)
                    }}
                  />
                  <TextField
                    label='Max rating'
                    variant='outlined'
                    type='number'
                    onChange={(e) => {
                      setMaxRating(e.target.value)
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} align='center'>
              <Button
                variant='contained'
                color='primary'
                style={{ marginRight: '1rem' }}
                onClick={submitSearch}
              >
                Search
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleClose}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </React.Fragment>
  )
}

Search.propTypes = {
  setSearchResList: PropTypes.any
}
