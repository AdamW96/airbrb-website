import React from 'react'
import { useHistory, useLocation } from 'react-router'
import fetchFunc from '../services/fetchService'
import { fileToDataUrl } from '../services/sendImage'
import {
  Container,
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Checkbox,
  Box,
  makeStyles,
} from '@material-ui/core'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import DeleteIcon from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  gridContainer: {
    padding: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
}))
export default function Edit (props) {
  const { setShowAlert } = props
  const styles = useStyles()
  const history = useHistory()
  const location = useLocation()
  const [propertyType, setPropertyType] = React.useState(null)
  const [thumbnailType, setThumbnailType] = React.useState('image')
  const [inputImages, setInputImages] = React.useState([])
  // const [youtubeUrl, setYoutubeUrl] = React.useState('')
  const [updateData, setUpdateData] = React.useState(null)
  const listingId = location.pathname.split('/')[2]
  const showAlertMsg = (type, content) => {
    setShowAlert({ alertType: type, alertContent: content })
  }

  React.useEffect(() => {
    fetchFunc(`/listings/${listingId}`, 'GET').then((response) => {
      if (response.status !== 200) {
        showAlertMsg('error', "Can't get data about this list from backend")
        return
      }
      response.json().then((data) => {
        const newData = { ...data.listing }
        delete newData.reviews
        delete newData.availability
        delete newData.published
        delete newData.postedOn
        setUpdateData(newData)
        if (newData.metadata.entirePlace) {
          setPropertyType('entirePlace')
        } else if (newData.metadata.privateRoom) {
          setPropertyType('privateRoom')
        } else if (newData.metadata.shareRoom) {
          setPropertyType('shareRoom')
        }

        if (newData.thumbnail.slice(0, 4) === 'data') {
          setThumbnailType('image')
        } else {
          setThumbnailType('video')
        }
      })
    })
  }, [])

  const handleChangeProperty = (e) => {
    const data = { ...updateData }
    if (e.target.value === 'entirePlace') {
      data.metadata.entirePlace = true
      data.metadata.privateRoom = false
      data.metadata.shareRoom = false
    } else if (e.target.value === 'privateRoom') {
      data.metadata.entirePlace = false
      data.metadata.privateRoom = true
      data.metadata.shareRoom = false
    } else if (e.target.value === 'shareRoom') {
      data.metadata.entirePlace = false
      data.metadata.privateRoom = false
      data.metadata.shareRoom = true
    }
    setUpdateData(data)
    setPropertyType(e.target.value)
  }

  const handleChangeTitle = (e) => {
    const data = { ...updateData }
    data.title = e.target.value
    setUpdateData(data)
  }

  const handleChangePrice = (e) => {
    const data = { ...updateData }
    data.price = e.target.value
    setUpdateData(data)
  }

  const handleChangeBathRooms = (e) => {
    const data = { ...updateData }
    data.metadata.bathRoomNumber = e.target.value
    setUpdateData(data)
  }

  const handleChangeAddress = (e) => {
    const data = { ...updateData }
    if (e.target.name === 'street') {
      data.address.street = e.target.value
    } else if (e.target.name === 'city') {
      data.address.city = e.target.value
    } else if (e.target.name === 'state') {
      data.address.state = e.target.value
    } else if (e.target.name === 'postcode') {
      data.address.postcode = e.target.value
    } else if (e.target.name === 'country') {
      data.address.country = e.target.value
    }
    setUpdateData(data)
  }

  const handleAddNewRoom = () => {
    const data = { ...updateData }
    if (data.metadata.bedRooms.length >= 50) {
      showAlertMsg('error', 'You bedroom get maximum number, 50')
      return
    }
    const newRoom = { bedsNumber: '', size: '' }
    data.metadata.bedRooms.push(newRoom)
    setUpdateData(data)
  }

  const handleChangeBed = (e) => {
    const roomIndex = e.target.name.split('#')[1]
    const data = { ...updateData }
    data.metadata.bedRooms[roomIndex].bedsNumber = e.target.value
    setUpdateData(data)
  }

  const handleChangeSize = (e) => {
    const index = e.target.name.split('#')[1]
    const data = { ...updateData }
    data.metadata.bedRooms[index].size = e.target.value
    setUpdateData(data)
  }

  const handleRemoveBed = (e) => {
    const index = e.currentTarget.name.split('#')[1]
    const data = { ...updateData }
    data.metadata.bedRooms.splice(index, 1)
    setUpdateData(data)
  }

  const createBedRooms = (list) => {
    if (list.length === 0) return <h5>No room</h5>
    return (
      <React.Fragment>
        {list.map((ele, index) => {
          return (
            <Grid container key={index}>
              <Grid item xs={3}>
                <Typography>{`Room ${index + 1}`}</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label='Number of beds'
                  name={`bedsNumber#${index}`}
                  type='number'
                  placeholder='Enter number of beds in this room'
                  value={updateData.metadata.bedRooms[index].bedsNumber}
                  onChange={handleChangeBed}
                  InputProps={{
                    inputProps: {
                      max: 50,
                      min: 0,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id='select-label'>Bed size</InputLabel>
                  <Select
                    labelId='select-label'
                    id='select'
                    name={`size#${index}`}
                    value={updateData.metadata.bedRooms[index].size}
                    onChange={handleChangeSize}
                  >
                    <MenuItem value={'single'}>Single</MenuItem>
                    <MenuItem value={'double'}>Double</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <IconButton name={`remove#${index}`} onClick={handleRemoveBed}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          )
        })}
      </React.Fragment>
    )
  }

  const handleChangeAmen = (e) => {
    const data = { ...updateData }
    if (e.target.name === 'pool') {
      data.metadata.pool = !data.metadata.pool
    } else if (e.target.name === 'BBQ') {
      data.metadata.BBQ = !data.metadata.BBQ
    } else if (e.target.name === 'parking') {
      data.metadata.parking = !data.metadata.parking
    } else if (e.target.name === 'airCondition') {
      data.metadata.airCondition = !data.metadata.airCondition
    } else if (e.target.name === 'wifi') {
      data.metadata.wifi = !data.metadata.wifi
    } else if (e.target.name === 'TV') {
      data.metadata.TV = !data.metadata.TV
    } else if (e.target.name === 'kitchen') {
      data.metadata.kitchen = !data.metadata.kitchen
    } else if (e.target.name === 'hotTub') {
      data.metadata.hotTub = !data.metadata.hotTub
    }
    setUpdateData(data)
  }

  const handleChangeThumbnailType = (e) => {
    setThumbnailType(e.target.value)
  }

  const handleInputFile = (e) => {
    setInputImages(e.target.files)
  }

  const handleChangeYoutubeUrl = (e) => {
    const data = { ...updateData }
    data.thumbnail = e.target.value
    setUpdateData(data)
  }

  const filesContent = (function () {
    if (inputImages.length === 0) return <Typography> No file </Typography>
    else {
      let fileStr = ''
      for (let i = 0; i < inputImages.length; i++) {
        fileStr += ` ${inputImages[i].name}`
      }
      return <Typography> Files are{fileStr} </Typography>
    }
  })()

  const jumpToHosted = () => {
    history.push('/hosted')
  }

  const checkValidation = (ele) => {
    if (
      ele.title.length === 0 ||
      ele.price.length === 0 ||
      ele.address.street.length === 0 ||
      ele.address.city.length === 0 ||
      ele.address.state.length === 0 ||
      ele.address.postcode.length === 0 ||
      ele.address.country.length === 0 ||
      ele.thumbnail.length === 0
    ) {
      showAlertMsg('error', 'You can change information to empty!')
      return false
    }
    return true
  }

  const submitSave = () => {
    if (thumbnailType === 'image') {
      if (inputImages.length !== 0) {
        if (inputImages.length > 3) {
          showAlertMsg('error', 'You must upload right number of images')
          return
        }
        let thumbnailStr = ''
        for (let i = 0; i < inputImages.length; i++) {
          fileToDataUrl(inputImages[i]).then((res) => {
            thumbnailStr += `${res} `
            if (i === inputImages.length - 1) {
              const data = { ...updateData }
              data.thumbnail = thumbnailStr
              if (!checkValidation(data)) return
              fetchFunc(`/listings/${listingId}`, 'PUT', data)
                .then((response) => {
                  if (response.status !== 200) {
                    showAlertMsg('error', 'invalid submit')
                    return
                  }
                  showAlertMsg('success', 'Update list successfully')
                  history.push('/hosted')
                })
                .catch((err) => {
                  console.log(err)
                  showAlertMsg('error', 'can not connect server')
                })
            }
          })
        }
      } else {
        const data = { ...updateData }
        if (!checkValidation(data)) return
        fetchFunc(`/listings/${listingId}`, 'PUT', data)
          .then((response) => {
            if (response.status !== 200) {
              showAlertMsg('error', 'invalid submit')
              return
            }
            showAlertMsg('success', 'Update list successfully')
            history.push('/hosted')
          })
          .catch((err) => {
            console.log(err)
            showAlertMsg('error', 'can not connect server')
          })
      }
    } else {
      const data = { ...updateData }
      if (!checkValidation(data)) return
      fetchFunc(`/listings/${listingId}`, 'PUT', data)
        .then((response) => {
          if (response.status !== 200) {
            showAlertMsg('error', 'invalid submit')
            return
          }
          showAlertMsg('success', 'Update list successfully')
          history.push('/hosted')
        })
        .catch((err) => {
          console.log(err)
          showAlertMsg('error', 'can not connect server')
        })
    }
  }

  return (
    <React.Fragment>
      {!updateData && <h1>Loading</h1>}
      {updateData && (
        <Container className={styles.container}>
          <Grid container className={styles.gridContainer}>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Property type</FormLabel>
              <RadioGroup value={propertyType} onChange={handleChangeProperty}>
                <FormControlLabel
                  value='entirePlace'
                  control={<Radio />}
                  label='Entire place'
                />
                <FormControlLabel
                  value='privateRoom'
                  control={<Radio />}
                  label='Private room'
                />
                <FormControlLabel
                  value='shareRoom'
                  control={<Radio />}
                  label='Share room'
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid container spacing={2} className={styles.gridContainer}>
            <Grid item xs={12} sm={6}>
              <Typography>Title:</Typography>
              <TextField
                // label='Title'
                helperText='Input list title'
                multiline
                maxRows={4}
                value={updateData.title}
                onChange={handleChangeTitle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Price:</Typography>
              <TextField
                // label='Price per night'
                name='price'
                type='number'
                placeholder='Input price per night'
                helperText='Input price per night'
                value={updateData.price}
                onChange={handleChangePrice}
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
              <Typography>Street:</Typography>
              <TextField
                // label='Street'
                name='street'
                type='text'
                placeholder='Input street'
                helperText='Enter the street name and house number'
                value={updateData.address.street}
                onChange={handleChangeAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>City:</Typography>
              <TextField
                // label='City'
                name='city'
                type='text'
                placeholder='Input city'
                helperText='Enter the city name'
                value={updateData.address.city}
                onChange={handleChangeAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>State:</Typography>
              <TextField
                // label='State'
                name='state'
                type='text'
                placeholder='Input state'
                helperText='Enter the state name'
                value={updateData.address.state}
                onChange={handleChangeAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Postcode:</Typography>
              <TextField
                // label='Postcode'
                name='postcode'
                type='number'
                placeholder='Input postcode'
                helperText='Enter the postcode number'
                value={updateData.address.postcode}
                onChange={handleChangeAddress}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Country:</Typography>
              <TextField
                placeholder='Input Country'
                // label='Country'
                name='country'
                type='text'
                helperText='Enter the country name'
                value={updateData.address.country}
                onChange={handleChangeAddress}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Bathrooms:</Typography>
              <TextField
                placeholder='Input number of bathroom'
                // label='Bathrooms'
                name='bathroom'
                type='number'
                helperText='Enter the number of bathrooms in this list'
                value={updateData.metadata.bathRoomNumber}
                onChange={handleChangeBathRooms}
                InputProps={{
                  inputProps: {
                    max: 50,
                    min: 0,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={styles.gridContainer}>
            <Grid item xs={6}>
              Bedrooms:
              <Button
                color='primary'
                variant='outlined'
                onClick={handleAddNewRoom}
              >
                Add New Room
              </Button>
            </Grid>
            <Grid container spacing={1}>
              {createBedRooms(updateData.metadata.bedRooms)}
            </Grid>
          </Grid>
          <Grid container spacing={2} className={styles.gridContainer}>
            <Grid item xs={12}>
              <Typography variant='h5'>Change amenities:</Typography>
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={updateData.metadata.pool}
                    onChange={handleChangeAmen}
                    name='pool'
                  />
                }
                label='Pool'
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={updateData.metadata.BBQ}
                    onChange={handleChangeAmen}
                    name='BBQ'
                  />
                }
                label='BBQ'
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={updateData.metadata.parking}
                    onChange={handleChangeAmen}
                    name='parking'
                  />
                }
                label='Parking'
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={updateData.metadata.airCondition}
                    onChange={handleChangeAmen}
                    name='airCondition'
                  />
                }
                label='AirCondition'
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={updateData.metadata.wifi}
                    onChange={handleChangeAmen}
                    name='wifi'
                  />
                }
                label='WIFI'
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={updateData.metadata.TV}
                    onChange={handleChangeAmen}
                    name='TV'
                  />
                }
                label='TV'
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={updateData.metadata.kitchen}
                    onChange={handleChangeAmen}
                    name='kitchen'
                  />
                }
                label='Kitchen'
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={updateData.metadata.hotTub}
                    onChange={handleChangeAmen}
                    name='hotTub'
                  />
                }
                label='HotTub'
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={styles.gridContainer}>
            <Grid item xs={6}>
              <FormControl component='fieldset'>
                <Typography variant='h5'>Thumbnail:</Typography>
                <RadioGroup
                  value={thumbnailType}
                  onChange={handleChangeThumbnailType}
                >
                  <FormControlLabel
                    value='image'
                    control={<Radio />}
                    label='Image'
                  />
                  <FormControlLabel
                    value='video'
                    control={<Radio />}
                    label='Video'
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
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
                  <Typography>
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
              {thumbnailType !== 'image' && (
                <TextField
                  fullWidth
                  label='Youtube URL'
                  name='youtube'
                  type='text'
                  placeholder='Input youtube url'
                  value={updateData.thumbnail}
                  onChange={handleChangeYoutubeUrl}
                />
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} className={styles.gridContainer}>
            <Grid item>
              <Button
                size='large'
                variant='contained'
                color='primary'
                onClick={submitSave}
              >
                Save
              </Button>
              <Button
                size='large'
                variant='contained'
                color='secondary'
                onClick={jumpToHosted}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  )
}

Edit.propTypes = {
  currentUser: PropTypes.any,
  setShowAlert: PropTypes.any,
  setCurrentUser: PropTypes.any,
}
