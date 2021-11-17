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
  Button,
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
import fetchFunc from '../services/fetchService'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import CardBottom from '../components/CardBottom'
import ReactPlayer from 'react-player/youtube'
import Rating from '@material-ui/lab/Rating'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import Modal from '@material-ui/core/Modal';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

function rand () {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle () {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
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
  paperModal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  const allscore = []
  function countAveragescore () {
    Object.entries(reviews).map(([key, v]) => {
      allscore.push(v.score)
      return allscore
    })
    const sum = allscore.reduce((a, b) => a + b, 0)
    const avg = sum / allscore.length || 0
    return Math.floor(avg)
  }
  const averageScore = countAveragescore();

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const percentageScore = [0, 0, 0, 0, 0]
  const classifiedByNumStars = [[], [], [], [], []]
  for (let i = 0; i < reviews.length; i++) {
    switch (reviews[i].score) {
      case 5:
        percentageScore[4] += 1;
        classifiedByNumStars[4].push(reviews[i]);
        break
      case 4:
        percentageScore[3] += 1;
        classifiedByNumStars[3].push(reviews[i]);
        break
      case 3:
        percentageScore[2] += 1;
        classifiedByNumStars[2].push(reviews[i]);
        break
      case 2:
        percentageScore[1] += 1;
        classifiedByNumStars[1].push(reviews[i]);
        break
      case 1:
        percentageScore[0] += 1;
        classifiedByNumStars[0].push(reviews[i]);
        break
    }
  }
  const [modalStyle] = React.useState(getModalStyle);
  const [openFive, setOpenFive] = React.useState(false);
  const handleOpenFive = () => { setOpenFive(true); };
  const handleCloseFive = () => { setOpenFive(false); };

  const [openFour, setOpenFour] = React.useState(false);
  const handleOpenFour = () => { setOpenFour(true); };
  const handleCloseFour = () => { setOpenFour(false); };

  const [openThree, setOpenThree] = React.useState(false);
  const handleOpenThree = () => { setOpenThree(true); };
  const handleCloseThree = () => { setOpenThree(false); };

  const [openTwo, setOpenTwo] = React.useState(false);
  const handleOpenTwo = () => { setOpenTwo(true); };
  const handleCloseTwo = () => { setOpenTwo(false); };

  const [openOne, setOpenOne] = React.useState(false);
  const handleOpenOne = () => { setOpenOne(true); };
  const handleCloseOne = () => { setOpenOne(false); };

  const bodyFiveStars = (
    <div style={modalStyle} className={classes.paperModal}>
      <h2 id="simple-modal-title">All comments with 5 Stars</h2>
      {classifiedByNumStars[4].map((ele, index) => {
        return (
          <ListItem key={index}>
            <Rating name='read-only' value={ele.score} readOnly />
            <p>{ele.comment}</p>
            <br />
          </ListItem>
        )
      })}
    </div>
  );
  const bodyFourStars = (
    <div style={modalStyle} className={classes.paperModal}>
      <h2 id="simple-modal-title">All comments with 4 Stars</h2>
      {classifiedByNumStars[3].map((ele, index) => {
        return (
          <ListItem key={index}>
            <Rating name='read-only' value={ele.score} readOnly />
            <p>{ele.comment}</p>
            <br />
          </ListItem>
        )
      })}
    </div>
  );
  const bodyThreeStars = (
    <div style={modalStyle} className={classes.paperModal}>
      <h2 id="simple-modal-title">All comments with 3 Stars</h2>
      {classifiedByNumStars[2].map((ele, index) => {
        return (
          <ListItem key={index}>
            <Rating name='read-only' value={ele.score} readOnly />
            <p>{ele.comment}</p>
            <br />
          </ListItem>
        )
      })}
    </div>
  );
  const bodyTwoStars = (
    <div style={modalStyle} className={classes.paperModal}>
      <h2 id="simple-modal-title">All comments with 2 Stars</h2>
      {classifiedByNumStars[1].map((ele, index) => {
        return (
          <ListItem key={index}>
            <Rating name='read-only' value={ele.score} readOnly />
            <p>{ele.comment}</p>
            <br />
          </ListItem>
        )
      })}
    </div>
  );
  const bodyOneStars = (
    <div style={modalStyle} className={classes.paperModal}>
      <h2 id="simple-modal-title">All comments with 1 Stars</h2>
      {classifiedByNumStars[0].map((ele, index) => {
        return (
          <ListItem key={index}>
            <Rating name='read-only' value={ele.score} readOnly />
            <p>{ele.comment}</p>
            <br />
          </ListItem>
        )
      })}
    </div>
  );
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
                <Modal
                  open={openFive}
                  onClose={handleCloseFive}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {bodyFiveStars}
                </Modal>
                <Modal
                    open={openFour}
                    onClose={handleCloseFour}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {bodyFourStars}
                  </Modal>
                  <Modal
                    open={openThree}
                    onClose={handleCloseThree}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {bodyThreeStars}
                  </Modal>
                  <Modal
                    open={openTwo}
                    onClose={handleCloseTwo}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {bodyTwoStars}
                  </Modal>
                  <Modal
                    open={openOne}
                    onClose={handleCloseOne}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {bodyOneStars}
                  </Modal>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <>
                      <Typography>Total comments:{'   '}{reviews.length}</Typography>
                      <ul>
                        <li onClick={handleOpenFive}><Typography>Five  starts:{'   '}{percentageScore[4]}{'   '}({parseInt(percentageScore[4] / reviews.length * 100)}%)</Typography></li>
                        <li onClick={handleOpenFour}><Typography>Four  starts:{'   '}{percentageScore[3]}{'   '}({parseInt(percentageScore[3] / reviews.length * 100)}%)</Typography></li>
                        <li onClick={handleOpenThree}><Typography>Three starts:{'   '}{percentageScore[2]}{'   '}({parseInt(percentageScore[2] / reviews.length * 100)}%)</Typography></li>
                        <li onClick={handleOpenTwo}><Typography>Two   starts:{'   '}{percentageScore[1]}{'   '}({parseInt(percentageScore[1] / reviews.length * 100)}%)</Typography></li>
                        <li onClick={handleOpenOne}><Typography>One   starts:{'   '}{percentageScore[0]}{'   '}({parseInt(percentageScore[0] / reviews.length * 100)}%)</Typography></li>
                      </ul>
                      </>
                    </React.Fragment>
                  }
                  interactive
                >
                  <Button><Rating name="read-onlylal" value={averageScore} readOnly /></Button>
                </HtmlTooltip>
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
                  <Rating name='read-only' value={ele.score} readOnly />
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
