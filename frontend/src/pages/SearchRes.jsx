import React from 'react'
import {
  Container,
  Grid,
  Card,
  CardContent,
  ImageList,
  ImageListItem,
  Typography,
  makeStyles,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import ReactPlayer from 'react-player/youtube'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
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
const calculateBeds = (bedRooms) => {
  if (bedRooms.length === 0) return 0
  else {
    let number = 0
    for (let i = 0; i < bedRooms.length; i++) {
      number += parseInt(bedRooms[i].bedsNumber)
    }
    return number
  }
}
const calculateRating = (reviews) => {
  let number = 0
  if (reviews.length === 0) return number
  for (let i = 0; i < reviews.length; i++) {
    number += reviews[i].score
  }
  number = Math.floor(number / reviews.length)
  return number
}

const changeSecondToDate = (second) => {
  const date = new Date(second)
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return `${day}/${month}/${year}`
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
              <span>From</span>
              {` ${changeSecondToDate(date.start)} `}
              <span>To</span>
              {` ${changeSecondToDate(date.end)}`}
            </Typography>
          )
        })}
      </React.Fragment>
    )
  }
}

export default function SearchRes (props) {
  const styles = useStyles()
  const history = useHistory()
  const { searchResList } = props
  return (
    <Container className={styles.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} align='center'>
          <Typography variant='h5' align='center'>
            Search result
          </Typography>
        </Grid>
        {searchResList.map((ele, index) => {
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{ maxWidth: 345 }}
                onClick={() => {
                  history.push(`/listings/${ele.id}`)
                }}
              >
                {checkImageOrVedio(ele.thumbnail) && (
                  <div>
                    <ImageList cols={1}>
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
                  <Grid container justifyContent='center'>
                    <ReactPlayer url={ele.thumbnail} />
                  </Grid>
                )}
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography>{`Title: ${ele.title}`}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{`City: ${ele.address.city}`}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{`Price: ${ele.price}`}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{`Beds: ${calculateBeds(
                        ele.metadata.bedRooms
                      )}`}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{`Reviews: ${ele.reviews.length}`}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Rating:</Typography>
                      <Rating
                        name='read-onlylal'
                        value={calculateRating(ele.reviews)}
                        readOnly
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {showPublishedDate(ele)}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

SearchRes.propTypes = {
  searchResList: PropTypes.any,
}
