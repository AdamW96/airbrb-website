import React from 'react'
import { useHistory } from 'react-router-dom'
import { initData } from '../services/config'
import fetchFunc from '../services/fetchService'
import { fileToDataUrl } from '../services/sendImage'
import Box from '@material-ui/core/Box'
// import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import InputAdornment from '@material-ui/core/InputAdornment'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import PoolIcon from '@material-ui/icons/Pool'
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill'
import LocalParkingIcon from '@material-ui/icons/LocalParking'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import WifiIcon from '@material-ui/icons/Wifi'
import TvIcon from '@material-ui/icons/Tv'
import KitchenIcon from '@material-ui/icons/Kitchen'
import HotTubIcon from '@material-ui/icons/HotTub'
import DeleteIcon from '@material-ui/icons/Delete'
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

  bedroomsList: {
    paddingLeft: theme.spacing(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTitle: { width: 'auto' },
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
    padding: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
}))

export default function Create (props) {
  const styles = useStyles()
  const history = useHistory()
  const [pageState, setPageState] = React.useState(1)
  const [dataState, setdataState] = React.useState(initData)
  // const [bedrooms, setBedrooms] = React.useState([])
  const [thumbnailType, setThumbnailType] = React.useState('image')
  const [Inputimage, setInputImage] = React.useState([])
  const [youtubeURL, setYoutubeURL] = React.useState('')
  const { setShowAlert } = props

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
    if (!/^\d+$/.test(dataState.address.postcode)) {
      showAlertMsg('error', 'You must enter positive number in postcode')
      return false
    }
    return true
  }

  const checkThirdValidation = () => {
    if (
      dataState.title.replace(' ', '').length === 0 ||
      dataState.price.replace(' ', '').length === 0 ||
      dataState.metadata.bathRoomNumber.replace(' ', '').length === 0
    ) {
      showAlertMsg('error', 'You must fill all information!')
      return false
    }
    if (!/^\d+$/.test(dataState.metadata.bathRoomNumber)) {
      showAlertMsg('error', 'You must enter positive number in bathrooms')
      return false
    }
    if (!/^\d+$/.test(dataState.price)) {
      showAlertMsg('error', 'You must enter positive number in price per night')
      return false
    }
    if (dataState.metadata.bedRooms.length > 0) {
      for (let i = 0; i < dataState.metadata.bedRooms.length; i++) {
        if (
          dataState.metadata.bedRooms[i].bedsNumber.length === 0 ||
          dataState.metadata.bedRooms[i].size.length === 0
        ) {
          showAlertMsg(
            'error',
            'You must finish all empty bedroom or remove it !'
          )
          return false
        }
        if (
          !/^[0-9]*[1-9][0-9]*$/.test(dataState.metadata.bedRooms[i].bedsNumber)
        ) {
          showAlertMsg(
            'error',
            'You must enter positive number in number of beds'
          )
          return false
        }
      }
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
    } else if (pageState === 4) {
      return true
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
    if (e.currentTarget.name === 'entirePlace') {
      if (newData.metadata.privateRoom || newData.metadata.shareRoom) {
        showAlertMsg('info', 'You can only choose one type')
        return
      }
      newData.metadata.entirePlace = !newData.metadata.entirePlace
    } else if (e.currentTarget.name === 'privateRoom') {
      if (newData.metadata.entirePlace || newData.metadata.shareRoom) {
        showAlertMsg('info', 'You can only choose one type')
        return
      }
      newData.metadata.privateRoom = !newData.metadata.privateRoom
    } else if (e.currentTarget.name === 'shareRoom') {
      if (newData.metadata.entirePlace || newData.metadata.privateRoom) {
        showAlertMsg('info', 'You can only choose one type')
        return
      }
      newData.metadata.shareRoom = !newData.metadata.shareRoom
    }
    setdataState(newData)
  }

  const handleAmenities = (e) => {
    const newData = { ...dataState }
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

  const handleAddNewRoom = () => {
    const newData = { ...dataState }
    if (newData.metadata.bedRooms.length >= 50) {
      showAlertMsg('error', "You can't add more bedroom, maximum number is 50")
      return
    }
    const newRoom = { bedsNumber: '', size: '' }
    newData.metadata.bedRooms.push(newRoom)
    setdataState(newData)
  }

  const handleChangeBeds = (e) => {
    const newData = { ...dataState }
    const type = e.target.name.split('#')[0]
    const index = e.target.name.split('#')[1]
    if (type === 'bedsNumber') {
      newData.metadata.bedRooms[index].bedsNumber = e.target.value
    } else if (type === 'size') {
      newData.metadata.bedRooms[index].size = e.target.value
    }
    setdataState(newData)
  }

  const removeRoom = (e) => {
    const newData = { ...dataState }
    const index = e.currentTarget.name.split('#')[1]
    newData.metadata.bedRooms.splice(index, 1)
    setdataState(newData)
  }

  const createOneRoom = (index) => {
    return (
      <Grid container spacing={3} className={styles.bedroomsList} key={index}>
        <Grid item textAlign='right' xs={3} className={styles.listItem}>
          <Typography className={styles.listTitle}>{`Room ${
            index + 1
          }`}</Typography>
        </Grid>
        <Grid item textAlign='center' xs={3}>
          <TextField
            fullWidth
            label='Number of beds'
            name={`bedsNumber#${index}`}
            type='number'
            placeholder='Enter number of beds in this room'
            value={dataState.metadata.bedRooms[index].bedsNumber}
            onChange={(e) => {
              handleChangeBeds(e)
            }}
            InputProps={{
              inputProps: {
                max: 50,
                min: 0,
              },
            }}
          />
        </Grid>
        <Grid item textAlign='center' xs={3}>
          <FormControl fullWidth>
            <InputLabel id='select-label'>Bed size</InputLabel>
            <Select
              labelId='select-label'
              id='select'
              name={`size#${index}`}
              value={dataState.metadata.bedRooms[index].size}
              onChange={(e) => {
                handleChangeBeds(e)
              }}
            >
              <MenuItem value={'single'}>Single</MenuItem>
              <MenuItem value={'double'}>Double</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item textAlign='left' xs={3}>
          <IconButton
            name={`delete#${index}`}
            onClick={(e) => {
              removeRoom(e)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    )
  }

  const handleChangeFile = (e) => {
    setThumbnailType(e.target.value)
  }

  const handleChangeURL = (e) => {
    setYoutubeURL(e.target.value)
  }

  const handleInputFile = (e) => {
    setInputImage(e.target.files)
  }

  const handleSubmit = () => {
    if (thumbnailType === 'image') {
      if (Inputimage.length === 0 || Inputimage.length > 3) {
        showAlertMsg('error', 'You must upload right number of images')
        return
      }
      let thumbnailStr = ''
      for (let i = 0; i < Inputimage.length; i++) {
        fileToDataUrl(Inputimage[i]).then((res) => {
          thumbnailStr += `${res} `
          if (i === Inputimage.length - 1) {
            const data = { ...dataState }
            data.thumbnail = thumbnailStr
            console.log(data);
            fetchFunc('/listings/new', 'POST', data)
              .then((response) => {
                if (response.status !== 200) {
                  console.log(response.status);
                  showAlertMsg('error', 'invalid submit')
                  return
                }
                setdataState({ ...initData })
                showAlertMsg('success', 'create new list successfully')
                history.push('/hosted')
              })
              .catch((err) => {
                console.log(err)
                showAlertMsg('error', 'can not connect server')
              })
          }
        })
      }
    } else if (thumbnailType === 'video') {
      const data = { ...dataState }
      if (youtubeURL.length === 0) {
        showAlertMsg('error', 'You must enter a youtube URL')
        return
      }
      data.thumbnail = youtubeURL
      fetchFunc('/listings/new', 'POST', data)
        .then((response) => {
          if (response.status !== 200) {
            showAlertMsg('error', 'invalid submit')
            return
          }
          showAlertMsg('success', 'create new list successfully')
          history.push('/hosted')
          setdataState({ ...initData })
        })
        .catch((err) => {
          console.log(err)
          showAlertMsg('error', 'can not connect server')
        })
    }
  }

  const filesContent = (function () {
    if (Inputimage.length === 0) return <Typography> No file </Typography>
    else {
      let fileStr = ''
      for (let i = 0; i < Inputimage.length; i++) {
        fileStr += ` ${Inputimage[i].name}`
      }
      return <Typography> Files are{fileStr} </Typography>
    }
  })()

  const formContent = (function () {
    if (pageState === 1) {
      return (
        <Box name='firstForm' textAlign='center' className={styles.formBox}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                name='entirePlace'
                id='entirePlace'
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
              <Typography variant='h6'>Street:</Typography>
              <TextField
                fullWidth
                // label='Street'
                name='street'
                id='street'
                type='text'
                placeholder='Input street'
                helperText='Enter the street name and house number'
                value={dataState.address.street}
                onChange={handleChangeAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6'>City:</Typography>
              <TextField
                fullWidth
                // label='City'
                name='city'
                id='city'
                type='text'
                placeholder='Input city'
                helperText='Enter the city name'
                value={dataState.address.city}
                onChange={handleChangeAddress}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant='h6'>State:</Typography>
              <TextField
                fullWidth
                // label='State'
                name='state'
                id='state'
                type='text'
                placeholder='Input state'
                helperText='Enter the state name'
                value={dataState.address.state}
                onChange={handleChangeAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6'>Postcode:</Typography>
              <TextField
                fullWidth
                // label='Postcode'
                name='postcode'
                id='postcode'
                type='number'
                placeholder='Input postcode'
                helperText='Enter the postcode number'
                value={dataState.address.postcode}
                onChange={handleChangeAddress}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6'>Country:</Typography>
              <TextField
                fullWidth
                placeholder='Input Country'
                // label='Country'
                name='country'
                id='country'
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
              <Typography variant='h6'>House title:</Typography>
              <TextField
                fullWidth
                name='title'
                id='title'
                type='text'
                placeholder='Input title'
                value={dataState.title}
                onChange={handleChangeRooms}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6'>Price per night:</Typography>
              <TextField
                // label='Price per night'
                fullWidth
                name='price'
                id='price'
                type='number'
                placeholder='Input price per night'
                value={dataState.price}
                onChange={handleChangeRooms}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6'>Bathrooms:</Typography>
              <TextField
                fullWidth
                placeholder='Input number of bathroom'
                // label='Bathroom'
                name='bathroom'
                id='bathroom'
                type='number'
                value={dataState.metadata.bathRoomNumber}
                onChange={handleChangeRooms}
                InputProps={{
                  inputProps: {
                    max: 50,
                    min: 0,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant='h6'>Bedrooms:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleAddNewRoom}
                  >
                    Add New Room
                  </Button>
                </Grid>
                {dataState.metadata.bedRooms.map((ele, index) => {
                  return createOneRoom(index)
                })}
              </Grid>
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
                  id='pool'
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
    } else if (pageState === 5) {
      return (
        <React.Fragment>
          <Typography variant='h5' align='center' className={styles.subtitle}>
            Upload image or video
          </Typography>
          <Box name='fifthForm' className={styles.formBox}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} align='center'>
                <Typography>Thumbnail</Typography>
                <FormControl component='fieldset'>
                  <RadioGroup
                    aria-label='thumbnail'
                    name='thumbnail'
                    value={thumbnailType}
                    onChange={handleChangeFile}
                  >
                    <FormControlLabel
                      value='image'
                      control={<Radio />}
                      label='image'
                    />
                    <FormControlLabel
                      value='video'
                      control={<Radio />}
                      label='video'
                      id='video'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} align='center'>
                {thumbnailType === 'image' && (
                  <Box>
                    <input
                      accept='image/jpeg,image/png,image/jpg'
                      className={styles.input}
                      id='upload-file'
                      multiple
                      type='file'
                      onChange={handleInputFile}
                    />
                    <Typography className={styles.uploadTitle}>
                      Upload at most 3 images (jpeg, png, jpg)
                    </Typography>
                    <label htmlFor='upload-file'>
                      <Button
                        variant='contained'
                        color='primary'
                        component='span'
                      >
                        Upload
                      </Button>
                    </label>
                    {filesContent}
                  </Box>
                )}
                {thumbnailType === 'video' && (
                  <TextField
                    fullWidth
                    label='Youtube URL'
                    id='youtube'
                    name='youtube'
                    type='text'
                    placeholder='Input youtube url'
                    value={youtubeURL}
                    onChange={handleChangeURL}
                  />
                )}
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
            {pageState !== 5 && (
              <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={handleNextPage}
                id='next'
              >
                Next
              </Button>
            )}
            {pageState === 5 && (
              <Button
                variant='contained'
                color='primary'
                size='large'
                id='submit'
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
