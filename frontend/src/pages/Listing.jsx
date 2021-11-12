import {
  Card,
  CardActions,
  CardContent,
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  Button,
  ImageList,
  ImageListItem,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import HouseIcon from '@material-ui/icons/House';
import KingBedIcon from '@material-ui/icons/KingBed';
import BathtubIcon from '@material-ui/icons/Bathtub';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import RoomIcon from '@material-ui/icons/Room';
import StarIcon from '@material-ui/icons/Star';
import HotelIcon from '@material-ui/icons/Hotel';
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import fetchFunc from '../services/fetchService'
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
Listing.propTypes = {
  props: PropTypes.any,
  setShowAlert: PropTypes.any,
}
function Listing (props) {
  const [value, setValue] = React.useState(new Date('2021-08-18T21:11:54'));
  const [response, setResponse] = useState(null);
  const { id } = useParams()
  useEffect(() => {
    fetchFunc(`/listings/${id}`, 'GET').then((response) => {
      if (response.status !== 200) {
        console.log('error', response)
        return
      }
      response.json().then((data) => {
        setResponse(data.listing);
      })
    })
  }, []);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const { setShowAlert } = props
  const showAlertMsg = (type, message) => {
    setShowAlert({ alertType: type, alertContent: message })
  }
  const handleOpen = () => {
    if (localStorage.getItem('user')) {
      setOpen(true)
    } else {
      showAlertMsg('error', 'Please Login First')
    }
    // const titleData = localStorage.getItem('user') ? setOpen(true) : showAlertMsg('error', 'Please Login First')
    // console.log(titleData);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h4>Please enter your booking time</h4>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start time"
              value={value}
              onChange={handleChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="End time"
              value={value}
              onChange={handleChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid container justifyContent="center">
          <Button
          variant="contained"
          color="primary"
          size='medium'
          style= {{ maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px' }}
          >
            BOOK
          </Button>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <Button
          variant="contained"
          color="primary"
          size='medium'
          style= {{ maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px' }}
          onClick={handleClose}>
            ClOSE
          </Button>
        </Grid>
    </div>
  );

  const DataOfListing = response;
  const addressData = DataOfListing ? DataOfListing.address.street + ',' + ' ' + DataOfListing.address.city + ',' + ' ' + DataOfListing.address.state : ' ';
  const titleData = DataOfListing ? DataOfListing.title : ' ';
  const roomType = DataOfListing ? (DataOfListing.metadata.shareRoom ? 'Share room' : (DataOfListing.metadata.privateRoom ? 'Private room' : (DataOfListing.metadata.entirePlace ? 'Entire Place' : ' '))) : ' ';
  const numBathroom = DataOfListing ? DataOfListing.metadata.bathRoomNumber : ' ';
  const numBedrooms = DataOfListing ? DataOfListing.metadata.bedRooms.length : ' ';
  const price = DataOfListing ? DataOfListing.price : ' ';
  const number = DataOfListing ? DataOfListing.metadata.bedRooms.reduce(function (a, v) { a = a + parseInt(v.bedsNumber); return a; }, 0) : ' ';
  const amenities = [];
  const hotTub = DataOfListing ? (DataOfListing.metadata.hotTub ? amenities.push('Hot Tub') : false) : ' ';
  const BBQ = DataOfListing ? (DataOfListing.metadata.BBQ ? amenities.push('BBQ') : false) : ' ';
  const TV = DataOfListing ? (DataOfListing.metadata.TV ? amenities.push('TV') : false) : ' ';
  const airCondition = DataOfListing ? (DataOfListing.metadata.airCondition ? amenities.push('AirCondition') : false) : ' ';
  const kitchen = DataOfListing ? (DataOfListing.metadata.kitchen ? amenities.push('Kitchen') : false) : ' ';
  const parking = DataOfListing ? (DataOfListing.metadata.parking ? amenities.push('Parking') : false) : ' ';
  const pool = DataOfListing ? (DataOfListing.metadata.pool ? amenities.push('Pool') : false) : ' ';
  const wifi = DataOfListing ? (DataOfListing.metadata.wifi ? amenities.push('WIFI') : false) : ' ';
  const thumbnail = DataOfListing ? DataOfListing.thumbnail : ' ';
  console.log(hotTub + BBQ + TV + airCondition + kitchen + parking + pool + wifi);

  const checkImageOrVedio = (thumbnail) => {
    return thumbnail.startsWith('data:image');
  }

  const getAllImage = (thumbnail) => {
    const allIMage = thumbnail.split(' ');
    allIMage.pop();
    return allIMage;
  }
  return (
    <Grid container justifyContent='center'>
    <Card sx={{ maxWidth: 245 }} style={{ width: '60%' }}>
    {checkImageOrVedio(thumbnail) && (
        <div className={classes.root}>
          <ImageList className={classes.imageList} cols={1}>
            {getAllImage(thumbnail).map((imageBase64) => {
              return (
                <ImageListItem key={imageBase64}>
                <img src={imageBase64} alt="Image of listings"/>
                </ImageListItem>
              )
            })}
          </ImageList>
        </div>
    )}
      {!checkImageOrVedio(thumbnail) && (
        <div style= {{ 'text-align': 'center' }}>
        <iframe
          width="420"
          height="315"
          title="YouTube video player"
          src={thumbnail}
          allowFullScreen>
        </iframe>
        </div>
      )}
      <CardContent>
        {/* Title */}
        <Typography gutterBottom variant="h5" component="div" align='center'>
          {titleData}
        </Typography>
        <List
          sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {/* Address */}
          <ListItem>
            <ListItemIcon>
              <RoomIcon />
            </ListItemIcon>
            <ListItemText primary="Address:" />
              <div>
                {addressData}
              </div>
          </ListItem>
          {/* Price (per night) */}
          <ListItem>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Price (per night):" />
              <div>
                ${price}
              </div>
          </ListItem>
          {/* Property Type */}
          <ListItem>
            <ListItemIcon>
              <HouseIcon />
            </ListItemIcon>
            <ListItemText primary="Property Type:" />
              <div>
                {roomType}
              </div>
          </ListItem>
          {/* Number of bedrooms */}
          <ListItem>
            <ListItemIcon>
              <HotelIcon />
            </ListItemIcon>
            <ListItemText primary="Number of bedrooms:" />
              <div>
                {numBedrooms}
              </div>
          </ListItem>
          {/* Number of beds (not bedrooms) */}
          <ListItem>
            <ListItemIcon>
              <KingBedIcon />
            </ListItemIcon>
            <ListItemText primary="Number of beds:" />
              <div>
                {number}
              </div>
          </ListItem>
          {/* Number of bathrooms */}
          <ListItem>
            <ListItemIcon>
              <BathtubIcon />
            </ListItemIcon>
            <ListItemText primary="Number of bathrooms:" />
              <div>
                {numBathroom}
              </div>
          </ListItem>
          {/* Amenities */}
          <ListItem>
            <ListItemIcon>
              <OutdoorGrillIcon />
            </ListItemIcon>
            <ListItemText primary="Amenities:" />
              <ul>
                { amenities.map(d => (<li key={d}>{d}</li>)) }
              </ul>
          </ListItem>
          {/* Number of total reviews */}
          <ListItem>
            <ListItemIcon>
              <RateReviewIcon />
            </ListItemIcon>
            <ListItemText primary="Reviews:" />
              <div>
                100这里还需要写review
              </div>
          </ListItem>
          {/* SVG rating of the listing (based on user ratings) */}
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Rating of the listing:" />
            {/* <Typography component="legend">Rating of the listing</Typography> */}
            {/* <Rating name="read-only" value={2} readOnly /> */}
          </ListItem>
        </List>
      </CardContent>
      {/* 这里加一条线 */}
      <Divider/>
      <CardActions>
        <Grid container justifyContent="center">
          <Button
          variant="contained"
          color="primary"
          size='medium'
          style= {{ maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px' }}
          onClick={handleOpen}
          >
            BOOK
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </Grid>
      </CardActions>
    </Card>
    </Grid>
  )
}

export default Listing
