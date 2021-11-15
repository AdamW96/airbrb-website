<<<<<<< HEAD
=======
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
    <div>
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
          <Grid container>
            <Grid container justifyContent='center'>
              <ReactPlayer url={thumbnail} />
            </Grid>
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
        {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
      <br />
    </div>
  )
}
ListingBody.propTypes = {
  title: PropTypes.string.isRequired,
  numReviews: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
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
        setAllLists(data.listings)
      })
    })
  }, [])
  useEffect(() => {
    const pbList = []
    let index = 0
    console.log(allLists)
    for (let i = 0; i < allLists.length; i++) {
      fetchFunc(`/listings/${allLists[i].id}`, 'GET').then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data)
            index += 1
            if (data.listing.published) {
              pbList.push(allLists[i])
            }
            console.log(pbList, index, response.length)
            if (index === allLists.length) {
              setPublished(pbList)
            }
          })
        } else {
          index += 1
          if (index === allLists.length) {
            setPublished(pbList)
          }
        }
      })
    }
  }, [allLists])

  useEffect(() => {
    console.log(publishedList)
  }, [publishedList])

  return publishedList
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

function HomeLists () {
  const allListings = useFetch()
  console.log('all==>', allListings)
  if (allListings.length !== 0) {
    allListings.sort(compare)
  }
  console.log('alllisngs', allListings)
  return (
    <React.Fragment>
      {allListings.length === 0 && <h1>No data ... </h1>}
      {allListings.length !== 0 && (
        <div id='body1'>
          {Object.keys(allListings).map(function (key) {
            return (
              <ListingBody
                key={allListings[key].id}
                id={JSON.stringify(allListings[key].id)}
                title={allListings[key].title}
                numReviews={allListings[key].reviews.length}
                price={allListings[key].price}
                thumbnail={allListings[key].thumbnail}
              />
            )
          })}
        </div>
      )}
    </React.Fragment>
  )
}

export default HomeLists
>>>>>>> 9254143d142179029107191ed1a2efffcb99e9ee
