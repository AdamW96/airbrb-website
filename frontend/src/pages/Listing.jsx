import {
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  ImageList,
  ImageListItem,
  Popover,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import HouseIcon from '@material-ui/icons/House'
import KingBedIcon from '@material-ui/icons/KingBed'
import BathtubIcon from '@material-ui/icons/Bathtub'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import RoomIcon from '@material-ui/icons/Room'
import StarIcon from '@material-ui/icons/Star'
import HotelIcon from '@material-ui/icons/Hotel'
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import fetchFunc from '../services/fetchService'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import CardBottom from '../components/CardBottom'
import ReactPlayer from 'react-player/youtube'
import Rating from '@material-ui/lab/Rating'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}))

Listing.propTypes = {
  props: PropTypes.any,
  setShowAlert: PropTypes.any,
}
function Listing (props) {
  const [response, setResponse] = useState(null)
  const [fetchData, setFetchData] = useState(false)
  const { id } = useParams()
  const { setShowAlert } = props
  useEffect(() => {
    fetchFunc(`/listings/${id}`, 'GET').then((response) => {
      if (response.status !== 200) {
        console.log('error', response)
        return
      }
      response.json().then((data) => {
        setResponse(data.listing)
      })
    })
  }, [fetchData])
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const DataOfListing = response
  console.log(DataOfListing)
  const listingInfo = { title: '', owner: '', price: '', availability: [] }
  listingInfo.title = DataOfListing ? DataOfListing.title : ''
  listingInfo.owner = DataOfListing ? DataOfListing.owner : ''
  listingInfo.price = DataOfListing ? DataOfListing.price : ''
  listingInfo.availability = DataOfListing ? DataOfListing.availability : ''
  const addressData = DataOfListing
    ? DataOfListing.address.street +
      ',' +
      ' ' +
      DataOfListing.address.city +
      ',' +
      ' ' +
      DataOfListing.address.state
    : ' '
  const titleData = DataOfListing ? DataOfListing.title : ' '
  const roomType = DataOfListing
    ? DataOfListing.metadata.shareRoom
        ? 'Share room'
        : DataOfListing.metadata.privateRoom
          ? 'Private room'
          : DataOfListing.metadata.entirePlace
            ? 'Entire Place'
            : ' '
    : ' '
  const numBathroom = DataOfListing
    ? DataOfListing.metadata.bathRoomNumber
    : ' '
  const numBedrooms = DataOfListing
    ? DataOfListing.metadata.bedRooms.length
    : ' '
  const price = DataOfListing ? DataOfListing.price : ' '
  const number = DataOfListing
    ? DataOfListing.metadata.bedRooms.reduce(function (a, v) {
        a = a + parseInt(v.bedsNumber)
        return a
      }, 0)
    : ' '
  const amenities = []
  const hotTub = DataOfListing
    ? DataOfListing.metadata.hotTub
        ? amenities.push('Hot Tub')
        : false
    : ' '
  const BBQ = DataOfListing
    ? DataOfListing.metadata.BBQ
        ? amenities.push('BBQ')
        : false
    : ' '
  const TV = DataOfListing
    ? DataOfListing.metadata.TV
        ? amenities.push('TV')
        : false
    : ' '
  const airCondition = DataOfListing
    ? DataOfListing.metadata.airCondition
        ? amenities.push('AirCondition')
        : false
    : ' '
  const kitchen = DataOfListing
    ? DataOfListing.metadata.kitchen
        ? amenities.push('Kitchen')
        : false
    : ' '
  const parking = DataOfListing
    ? DataOfListing.metadata.parking
        ? amenities.push('Parking')
        : false
    : ' '
  const pool = DataOfListing
    ? DataOfListing.metadata.pool
        ? amenities.push('Pool')
        : false
    : ' '
  const wifi = DataOfListing
    ? DataOfListing.metadata.wifi
        ? amenities.push('WIFI')
        : false
    : ' '
  const thumbnail = DataOfListing ? DataOfListing.thumbnail : ' '
  const reviews = DataOfListing ? DataOfListing.reviews : []
  console.log(
    hotTub + BBQ + TV + airCondition + kitchen + parking + pool + wifi + reviews
  )
  const checkImageOrVedio = (thumbnail) => {
    return thumbnail.startsWith('data:image')
  }

  const getAllImage = (thumbnail) => {
    const allIMage = thumbnail.split(' ')
    allIMage.pop()
    return allIMage
  }
  const allsocre = []
  function countAverageSocre () {
    Object.entries(reviews).map(([key, v]) => {
      allsocre.push(v.socre)
      return allsocre
    })
    const sum = allsocre.reduce((a, b) => a + b, 0)
    const avg = sum / allsocre.length || 0
    return Math.floor(avg)
  }
  const averageScore = countAverageSocre();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const percentageScore = [0, 0, 0, 0, 0]
  for (let i = 0; i < reviews.length; i++) {
    switch (reviews[i].socre) {
      case 5:
        percentageScore[4] += 1;
        break
      case 4:
        percentageScore[3] += 1;
        break
      case 3:
        percentageScore[2] += 1;
        break
      case 2:
        percentageScore[1] += 1;
        break
      case 1:
        percentageScore[0] += 1;
        break
    }
  }
  console.log(percentageScore);
  return (
    <Container className={classes.container}>
      <Grid container justifyContent='center'>
        <Card sx={{ maxWidth: 245 }} style={{ width: '60%' }}>
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
            {/* Title */}
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              align='center'
            >
              {titleData}
            </Typography>
            <List
              sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}
              component='nav'
              aria-labelledby='nested-list-subheader'
            >
              {/* Address */}
              <ListItem>
                <ListItemIcon>
                  <RoomIcon />
                </ListItemIcon>
                <ListItemText primary='Address:' />
                <div>{addressData}</div>
              </ListItem>
              {/* Price (per night) */}
              <ListItem>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary='Price (per night):' />
                <div>${price}</div>
              </ListItem>
              {/* Property Type */}
              <ListItem>
                <ListItemIcon>
                  <HouseIcon />
                </ListItemIcon>
                <ListItemText primary='Property Type:' />
                <div>{roomType}</div>
              </ListItem>
              {/* Number of bedrooms */}
              <ListItem>
                <ListItemIcon>
                  <HotelIcon />
                </ListItemIcon>
                <ListItemText primary='Number of bedrooms:' />
                <div>{numBedrooms}</div>
              </ListItem>
              {/* Number of beds (not bedrooms) */}
              <ListItem>
                <ListItemIcon>
                  <KingBedIcon />
                </ListItemIcon>
                <ListItemText primary='Number of beds:' />
                <div>{number}</div>
              </ListItem>
              {/* Number of bathrooms */}
              <ListItem>
                <ListItemIcon>
                  <BathtubIcon />
                </ListItemIcon>
                <ListItemText primary='Number of bathrooms:' />
                <div>{numBathroom}</div>
              </ListItem>
              {/* Amenities */}
              <ListItem>
                <ListItemIcon>
                  <OutdoorGrillIcon />
                </ListItemIcon>
                <ListItemText primary='Amenities:' />
                <ul>
                  {amenities.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </ListItem>
              {/* Average Rating of this listing */}
              <ListItem>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary='Average Rating of this listing:' />
                <Typography
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <Rating name="read-onlylal" value={averageScore} readOnly />
                </Typography>
                <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography>Total comments:{'   '}{reviews.length}</Typography>
                <ul>
                  <li><Typography>Five  starts:{'   '}{percentageScore[4]}{'   '}({parseInt(percentageScore[4] / reviews.length * 100)}%)</Typography></li>
                  <li><Typography>Four  starts:{'   '}{percentageScore[3]}{'   '}({parseInt(percentageScore[3] / reviews.length * 100)}%)</Typography></li>
                  <li><Typography>Three starts:{'   '}{percentageScore[2]}{'   '}({parseInt(percentageScore[2] / reviews.length * 100)}%)</Typography></li>
                  <li><Typography>Two   starts:{'   '}{percentageScore[1]}{'   '}({parseInt(percentageScore[1] / reviews.length * 100)}%)</Typography></li>
                  <li><Typography>One   starts:{'   '}{percentageScore[0]}{'   '}({parseInt(percentageScore[0] / reviews.length * 100)}%)</Typography></li>
                </ul>
              </Popover>
              </ListItem>
            </List>
          </CardContent>
          {/* 这里加一条线 */}
          <Divider />
          <CardActions>
            <Grid container justifyContent='center'>
              <CardBottom
                dataListing={response}
                setFetchData={setFetchData}
                fetchData={fetchData}
                setShowAlert={setShowAlert}
                listingId={id}
                listingInfo={listingInfo}
              />
            </Grid>
          </CardActions>
          <Divider />
          <CardContent>
            {/* Reviews */}
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              align='center'
            >
              All Reviews
            </Typography>
            {reviews.map((ele, index) => {
              return (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ThumbUpIcon />
                  </ListItemIcon>
                  <Rating name='read-only' value={ele.socre} readOnly />
                  <p>{ele.comment}</p>
                  <br />
                </ListItem>
              )
            })}
          </CardContent>
        </Card>
      </Grid>
    </Container>
  )
}

export default Listing
