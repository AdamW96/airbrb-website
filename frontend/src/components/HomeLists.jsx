import {
  Card,
  Grid,
  CardContent,
  Typography,
  ImageList,
  ImageListItem,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import fetchFunc from '../services/fetchService'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'
import ReactPlayer from 'react-player/youtube'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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

function ListingBody ({ id, title, numReviews, price, thumbnail }) {
  const classes = useStyles()
  const history = useHistory()
  const goListingPage = () => {
    const location = '/listings/' + id
    history.push(location)
  }
  return (
    <Grid item xs={12} sm={4}>
      <Card sx={{ maxWidth: 345 }} onClick={goListingPage}>
        {checkImageOrVedio(thumbnail) && (
          <div className={classes.root}>
            <ImageList className={classes.imageList} cols={1}>
              {getAllImage(thumbnail).map((imageBase64) => {
                return (
                  <ImageListItem key={imageBase64}>
                    <img src={imageBase64} alt='Image of listings' />
                  </ImageListItem>
                )
              })}
            </ImageList>
          </div>
        )}
        {!checkImageOrVedio(thumbnail) && (
            <Grid container justifyContent='center'>
              <ReactPlayer url={thumbnail} />
            </Grid>
        )}
        <CardContent>
          <Typography variant='body2' color='textSecondary' align='center'>
            <b>🔹 Title:{'  '}</b>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' align='center'>
            <b>🔹 Number of reviews:{'  '}</b>
            {numReviews}
          </Typography>
          <Typography variant='body2' color='textSecondary' align='center'>
            <b>🔹 Price:{'  '}</b>${price}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
ListingBody.propTypes = {
  title: PropTypes.string.isRequired,
  numReviews: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

const compare = (a, b) => {
  if (a.title.toLowerCase() < b.title.toLowerCase()) {
    return -1
  }
  if (a.title.toLowerCase() > b.title.toLowerCase()) {
    return 1
  }
  return 0
}

const useFetch = () => {
  const [allLists, setAllLists] = useState([])
  const [publishedList, setPublished] = useState([])
  useEffect(() => {
    fetchFunc('/listings', 'GET').then((response) => {
      if (response.status !== 200) {
        return
      }
      response.json().then((data) => {
        console.log(data);
        setAllLists(data.listings)
      })
    })
  }, [])
  useEffect(() => {
    const pbList = []
    let index = 0
    for (let i = 0; i < allLists.length; i++) {
      fetchFunc(`/listings/${allLists[i].id}`, 'GET').then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            index += 1
            if (data.listing.published) {
              pbList.push(allLists[i])
            }
            if (index === allLists.length) {
              pbList.sort(compare)
              setPublished(pbList)
            }
          })
        } else {
          index += 1
          if (index === allLists.length) {
            pbList.sort(compare)
            setPublished(pbList)
          }
        }
      })
    }
  }, [allLists])

  return publishedList
}

function HomeLists () {
  const allPublished = useFetch()
  const [bookedList, setBookedList] = useState([])
  const [otherList, setOtherList] = useState([])
  const currentUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (currentUser) {
      fetchFunc('/bookings', 'GET').then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            const booked = []
            const others = []
            for (let i = 0; i < allPublished.length; i++) {
              for (let j = 0; j < data.bookings.length; j++) {
                if (
                  allPublished[i].id === parseInt(data.bookings[j].listingId)
                ) {
                  if (data.bookings[j].owner === currentUser.email) {
                    allPublished[i].status = data.bookings[j].status
                  }
                }
              }
            }
            for (let i = 0; i < allPublished.length; i++) {
              if (allPublished[i].status) {
                booked.push(allPublished[i])
              } else {
                others.push(allPublished[i])
              }
            }
            setBookedList(booked)
            setOtherList(others)
          })
        }
      })
    }
  }, [allPublished])

  return (
    <React.Fragment>
      {allPublished.length === 0 && <h1>No data ... </h1>}
      {allPublished.length !== 0 && !currentUser && (
        <Grid container id='body1' spacing={3}>
          {Object.keys(allPublished).map(function (key) {
            return (
              <ListingBody
                key={allPublished[key].id}
                id={JSON.stringify(allPublished[key].id)}
                title={allPublished[key].title}
                numReviews={allPublished[key].reviews.length}
                price={allPublished[key].price}
                thumbnail={allPublished[key].thumbnail}
              />
            )
          })}
        </Grid>
      )}
      {allPublished.length !== 0 && currentUser && (
        <div>
          <Grid container name='booked' spacing={3}>
            <Grid item xs={12}>
              <Typography variant='h5'>Booked listings:</Typography>
            </Grid>
            {bookedList.map((ele) => {
              return (
                  <ListingBody
                    key={ele.id}
                    id={JSON.stringify(ele.id)}
                    title={ele.title}
                    numReviews={ele.reviews.length}
                    price={ele.price}
                    thumbnail={ele.thumbnail}
                  />
              )
            })}
              {console.log(bookedList)}
          </Grid>
          <Grid container name='others' spacing={3}>
            <Grid item xs={12}>
              <Typography variant='h5'>Other listings:</Typography>
            </Grid>
            {otherList.map((ele) => {
              return (
                  <ListingBody
                    key={ele.id}
                    id={JSON.stringify(ele.id)}
                    title={ele.title}
                    numReviews={ele.reviews.length}
                    price={ele.price}
                    thumbnail={ele.thumbnail}
                  />
              )
            })}
              {console.log(otherList)}
          </Grid>
        </div>
      )}
    </React.Fragment>
  )
}

export default HomeLists
