import React from 'react'
import { useHistory } from 'react-router-dom';
import { initData } from '../services/config'
import fetchFunc from '../services/fetchService'
import Box from '@material-ui/core/Box'
// import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import PoolIcon from '@material-ui/icons/Pool'
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill'
import LocalParkingIcon from '@material-ui/icons/LocalParking'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import WifiIcon from '@material-ui/icons/Wifi'
import TvIcon from '@material-ui/icons/Tv'
import KitchenIcon from '@material-ui/icons/Kitchen'
import HotTubIcon from '@material-ui/icons/HotTub';
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    height: '100vh',
  },
  paper: {
    position: 'relative',
    height: '80vh',
    // paddingBottom: theme.spacing(5),
  },
  subtitle: {
    marginBottom: theme.spacing(5),
  },
  formBox: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    height: '50%',
    overflow: 'auto',
  },
  buttonGroup: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  nextButton: {
    marginLeft: 5,
  },
  choosedButton: {
    borderRadius: 5,
    // border: '2px black solid',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: '#3f51b5',
    border: '2px solid #3f51b5',
  },
  unChoosedButton: {
    borderRadius: 5,
    // border: '2px black solid',
    padding: theme.spacing(3),
    textAlign: 'center',
    border: '2px solid #b5b5b5',
  },
  amenitiesIcon: {
    padding: theme.spacing(5),
  },
}))

export default function Create (props) {
  // const initData = { title: '', address: {}, price: 0, thumbnail: '', metadata: {} }
  const styles = useStyles()
  const history = useHistory();
  const [pageState, setPageState] = React.useState(1)
  const [dataState, setdataState] = React.useState(initData)
  const { setShowAlert } = props
  React.useEffect(() => {
    setPageState(1)
    console.log(dataState)
  }, [])

  React.useEffect(() => {
    console.log(dataState)
  }, [dataState])

  const showAlertMsg = (type, message) => {
    setShowAlert({ alertType: type, alertContent: message })
  }

  const checkFirstFormValidation = () => {
    if (
      !dataState.metadata.entirePlace &&
      !dataState.metadata.privateRoom &&
      !dataState.metadata.shareRoom
    ) {
      showAlertMsg('error', 'You must choose one type!')
      return false
    }
    return true
  }

  const checkSecondValidation = () => {
    if (
      dataState.address.street.replace(' ', '').length === 0 ||
      dataState.address.city.replace(' ', '').length === 0 ||
      dataState.address.state.replace(' ', '').length === 0 ||
      dataState.address.postcode.replace(' ', '').length === 0 ||
      dataState.address.country.replace(' ', '').length === 0
    ) {
      showAlertMsg('error', 'You must fill all information!')
      return false
    }
    return true
  }

  const checkThirdValidation = () => {
    if (
      dataState.title.replace(' ', '').length === 0 ||
      dataState.price.replace(' ', '').length === 0 ||
      dataState.metadata.bedsNumber.replace(' ', '').length === 0 ||
      dataState.metadata.bedRoomNumber.replace(' ', '').length === 0 ||
      dataState.metadata.bathRoomNumber.replace(' ', '').length === 0
    ) {
      showAlertMsg('error', 'You must fill all information!')
      return false
    }
    return true
  }

  const checkValidation = () => {
    if (pageState === 1) {
      return checkFirstFormValidation()
    } else if (pageState === 2) {
      return checkSecondValidation()
    } else if (pageState === 3) {
      return checkThirdValidation()
    }
  }

  const handleNextPage = () => {
    if (checkValidation()) {
      setPageState((pageState) => pageState + 1)
    }
  }

  const handleBackPage = () => {
    setPageState((pageState) => pageState - 1)
  }

  const handlePropertyType = (e) => {
    const newData = { ...dataState }
    console.log(e.currentTarget)
    if (e.currentTarget.name === 'entirePlace') {
      if (newData.metadata.privateRoom || newData.metadata.shareRoom) {
        return
      }
      newData.metadata.entirePlace = !newData.metadata.entirePlace
    } else if (e.currentTarget.name === 'privateRoom') {
      if (newData.metadata.entirePlace || newData.metadata.shareRoom) {
        return
      }
      newData.metadata.privateRoom = !newData.metadata.privateRoom
    } else if (e.currentTarget.name === 'shareRoom') {
      if (newData.metadata.entirePlace || newData.metadata.privateRoom) {
        return
      }
      newData.metadata.shareRoom = !newData.metadata.shareRoom
    }
    setdataState(newData)
  }

  const handleAmenities = (e) => {
    const newData = { ...dataState }
    console.log(e.currentTarget)
    if (e.currentTarget.name === 'pool') {
      newData.metadata.pool = !newData.metadata.pool
    } else if (e.currentTarget.name === 'BBQ') {
      newData.metadata.BBQ = !newData.metadata.BBQ
    } else if (e.currentTarget.name === 'parking') {
      newData.metadata.parking = !newData.metadata.parking
    } else if (e.currentTarget.name === 'airCondition') {
      newData.metadata.airCondition = !newData.metadata.airCondition
    } else if (e.currentTarget.name === 'wifi') {
      newData.metadata.wifi = !newData.metadata.wifi
    } else if (e.currentTarget.name === 'TV') {
      newData.metadata.TV = !newData.metadata.TV
    } else if (e.currentTarget.name === 'kitchen') {
      newData.metadata.kitchen = !newData.metadata.kitchen
    } else if (e.currentTarget.name === 'hotTub') {
      newData.metadata.hotTub = !newData.metadata.hotTub
    }
    setdataState(newData)
  }

  const handleChangeAddress = (e) => {
    const newData = { ...dataState }
    if (e.target.name === 'street') {
      newData.address.street = e.target.value
    } else if (e.target.name === 'city') {
      newData.address.city = e.target.value
    } else if (e.target.name === 'state') {
      newData.address.state = e.target.value
    } else if (e.target.name === 'postcode') {
      newData.address.postcode = e.target.value
    } else if (e.target.name === 'country') {
      newData.address.country = e.target.value
    }
    setdataState(newData)
  }

  const handleChangeRooms = (e) => {
    const newData = { ...dataState }
    if (e.target.name === 'title') {
      newData.title = e.target.value
    } else if (e.target.name === 'price') {
      newData.price = e.target.value
    } else if (e.target.name === 'beds') {
      newData.metadata.bedsNumber = e.target.value
    } else if (e.target.name === 'bedroom') {
      newData.metadata.bedRoomNumber = e.target.value
    } else if (e.target.name === 'bathroom') {
      newData.metadata.bathRoomNumber = e.target.value
    }
    setdataState(newData)
  }

  const handleSubmit = () => {
    fetchFunc('/listings/new', 'POST', dataState).then((response) => {
      if (response.status !== 200) {
        showAlertMsg('error', 'invalid submit')
        return
      }
      showAlertMsg('success', 'create new list successfully')
      history.push('/')
    })
  }

  const formContent = (function () {
    if (pageState === 1) {
      return (
        <Box name='firstForm' textAlign='center' className={styles.formBox}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                name='entirePlace'
                className={
                  dataState.metadata.entirePlace
                    ? styles.choosedButton
                    : styles.unChoosedButton
                }
                onClick={handlePropertyType}
              >
                <Typography>An entire place</Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                name='privateRoom'
                className={
                  dataState.metadata.privateRoom
                    ? styles.choosedButton
                    : styles.unChoosedButton
                }
                onClick={handlePropertyType}
              >
                <Typography>A private room</Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                name='shareRoom'
                className={
                  dataState.metadata.shareRoom
                    ? styles.choosedButton
                    : styles.unChoosedButton
                }
                onClick={handlePropertyType}
              >
                <Typography>A shared room</Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      )
    } else if (pageState === 2) {
      return (
        <Box name='secondForm' className={styles.formBox}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h7'>Street:</Typography>
              <TextField
                fullWidth
                // label='Street'
                name='street'
                type='text'
                placeholder='Input street'
                helperText='Enter the street name and house number'
                value={dataState.address.street}
                onChange={handleChangeAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h7'>City:</Typography>
              <TextField
                fullWidth
                // label='City'
                name='city'
                type='text'
                placeholder='Input city'
                helperText='Enter the city name'
                value={dataState.address.city}
                onChange={handleChangeAddress}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant='h7'>State:</Typography>
              <TextField
                fullWidth
                // label='State'
                name='state'
                type='text'
                placeholder='Input state'
                helperText='Enter the state name'
                value={dataState.address.state}
                onChange={handleChangeAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h7'>Postcode:</Typography>
              <TextField
                fullWidth
                // label='Postcode'
                name='postcode'
                type='number'
                placeholder='Input postcode'
                helperText='Enter the postcode number'
                value={dataState.address.postcode}
                onChange={handleChangeAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h7'>Country:</Typography>
              <TextField
                fullWidth
                placeholder='Input Country'
                // label='Country'
                name='country'
                type='text'
                helperText='Enter the country name'
                value={dataState.address.country}
                onChange={handleChangeAddress}
              />
            </Grid>
          </Grid>
        </Box>
      )
    } else if (pageState === 3) {
      return (
        <Box name='thirdForm' className={styles.formBox}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h7'>House title:</Typography>
              <TextField
                fullWidth
                name='title'
                type='text'
                placeholder='Input title'
                value={dataState.title}
                onChange={handleChangeRooms}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h7'>Price per day:</Typography>
              <TextField
                // label='Price per day'
                fullWidth
                name='price'
                type='number'
                placeholder='Input price per day'
                value={dataState.price}
                onChange={handleChangeRooms}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant='h7'>Beds:</Typography>
              <TextField
                fullWidth
                // label='Beds'
                name='beds'
                type='number'
                placeholder='Input number of beds'
                value={dataState.metadata.bedsNumber}
                onChange={handleChangeRooms}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h7'>Bedrooms:</Typography>
              <TextField
                fullWidth
                placeholder='Input number of bedroom'
                // label='Bedroom'
                name='bedroom'
                type='number'
                value={dataState.metadata.bedRoomNumber}
                onChange={handleChangeRooms}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h7'>Bathrooms:</Typography>
              <TextField
                fullWidth
                placeholder='Input number of bathroom'
                // label='Bathroom'
                name='bathroom'
                type='number'
                value={dataState.metadata.bathRoomNumber}
                onChange={handleChangeRooms}
              />
            </Grid>
          </Grid>
        </Box>
      )
    } else if (pageState === 4) {
      return (
        <React.Fragment>
          <Typography variant='h5' align='center' className={styles.subtitle}>
            Choose amenities
          </Typography>
          <Box name='fourthForm' className={styles.formBox}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3} align='center'>
                <Typography>Pool</Typography>
                <Button
                  variant='outlined'
                  name='pool'
                  className={
                    dataState.metadata.pool
                      ? styles.choosedButton
                      : styles.unChoosedButton
                  }
                  onClick={handleAmenities}
                >
                  <PoolIcon fontSize='large' className={styles.amenitiesIcon} />
                </Button>
              </Grid>
              <Grid item xs={6} sm={3} align='center'>
                <Typography>BBQ grill</Typography>
                <Button
                  variant='outlined'
                  name='BBQ'
                  className={
                    dataState.metadata.BBQ
                      ? styles.choosedButton
                      : styles.unChoosedButton
                  }
                  onClick={handleAmenities}
                >
                  <OutdoorGrillIcon
                    fontSize='large'
                    className={styles.amenitiesIcon}
                  />
                </Button>
              </Grid>
              <Grid item xs={6} sm={3} align='center'>
                <Typography>Local parking</Typography>
                <Button
                  variant='outlined'
                  name='parking'
                  className={
                    dataState.metadata.parking
                      ? styles.choosedButton
                      : styles.unChoosedButton
                  }
                  onClick={handleAmenities}
                >
                  <LocalParkingIcon
                    fontSize='large'
                    className={styles.amenitiesIcon}
                  />
                </Button>
              </Grid>
              <Grid item xs={6} sm={3} align='center'>
                <Typography>Air condition</Typography>
                <Button
                  variant='outlined'
                  name='airCondition'
                  className={
                    dataState.metadata.airCondition
                      ? styles.choosedButton
                      : styles.unChoosedButton
                  }
                  onClick={handleAmenities}
                >
                  <AcUnitIcon
                    fontSize='large'
                    className={styles.amenitiesIcon}
                  />
                </Button>
              </Grid>
              <Grid item xs={6} sm={3} align='center'>
                <Typography>WIFI</Typography>
                <Button
                  variant='outlined'
                  name='wifi'
                  className={
                    dataState.metadata.wifi
                      ? styles.choosedButton
                      : styles.unChoosedButton
                  }
                  onClick={handleAmenities}
                >
                  <WifiIcon fontSize='large' className={styles.amenitiesIcon} />
                </Button>
              </Grid>
              <Grid item xs={6} sm={3} align='center'>
                <Typography>TV</Typography>
                <Button
                  variant='outlined'
                  name='TV'
                  className={
                    dataState.metadata.TV
                      ? styles.choosedButton
                      : styles.unChoosedButton
                  }
                  onClick={handleAmenities}
                >
                  <TvIcon fontSize='large' className={styles.amenitiesIcon} />
                </Button>
              </Grid>
              <Grid item xs={6} sm={3} align='center'>
                <Typography>Kitchen</Typography>
                <Button
                  variant='outlined'
                  name='kitchen'
                  className={
                    dataState.metadata.kitchen
                      ? styles.choosedButton
                      : styles.unChoosedButton
                  }
                  onClick={handleAmenities}
                >
                  <KitchenIcon
                    fontSize='large'
                    className={styles.amenitiesIcon}
                  />
                </Button>
              </Grid>
              <Grid item xs={6} sm={3} align='center'>
                <Typography>Hot tub</Typography>
                <Button
                  variant='outlined'
                  name='hotTub'
                  className={
                    dataState.metadata.hotTub
                      ? styles.choosedButton
                      : styles.unChoosedButton
                  }
                  onClick={handleAmenities}
                >
                  <HotTubIcon
                    fontSize='large'
                    className={styles.amenitiesIcon}
                  />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </React.Fragment>
      )
    }
  })()

  return (
    <React.Fragment>
      <Container className={styles.container}>
        <Paper variant='outlined' className={styles.paper}>
          <Box sx={{ my: 5 }}>
            <Typography variant='h4' align='center' className={styles.title}>
              Create New List
            </Typography>
          </Box>
          {formContent}
          <Box name='button' className={styles.buttonGroup}>
            {pageState > 1 && (
              <Button
                variant='contained'
                color='secondary'
                size='large'
                onClick={handleBackPage}
              >
                Back
              </Button>
            )}
            {pageState !== 4 && (
              <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={handleNextPage}
              >
                Next
              </Button>
            )}
            {pageState === 4 && (
              <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

Create.propTypes = {
  currentUser: PropTypes.any,
  setCurrentUser: PropTypes.any,
  setShowAlert: PropTypes.any,
}
/**
 * address :{
 * street:'1 kensington street'
 * city:'kensington'
 * state:'NSW'
 * postcode:'2032'
 * country: 'Australia'
 * }
 */
