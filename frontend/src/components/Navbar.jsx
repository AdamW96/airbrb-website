import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import fetchFunc from '../services/fetchService'
import Search from './Search'
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  // InputBase,
  alpha,
  Menu,
  MenuItem,
  // Divider,
  // Slider,
  // Grid,
  // Button,
  // Modal,
} from '@material-ui/core'
// import SearchIcon from '@material-ui/icons/Search'
// import CancelIcon from '@material-ui/icons/Cancel'
import AccountCircle from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import LockOpenIcon from '@material-ui/icons/LockOpen'
// import LocationCityIcon from '@material-ui/icons/LocationCity'
// import TocIcon from '@material-ui/icons/Toc'

import PropTypes from 'prop-types'

// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers'
// import DateFnsUtils from '@date-io/date-fns'

// function getModalStyle () {
//   const top = 50
//   const left = 50

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   }
// }
const useStyle = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  logo: {
    display: 'block',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      display: (props) => (props.openSearch ? 'flex' : 'none'),
      width: '60%',
    },
  },
  input: {
    color: 'white',
    marginLeft: theme.spacing(1),
  },
  cancel: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // icons: {
  //   display: (props) => (props.openSearch ? 'none' : 'flex'),
  //   alignItems: 'center',
  // },
  badge: {
    marginRight: theme.spacing(2),
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  profile: {
    alignItems: 'center',
  },
  buttons: {
    alignItems: 'center',
  },
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function Navbar (props) {
  // const [openSearch, setOpenSearch] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [signAnchorEL, setSignAnchorEL] = useState(null)
  const styles = useStyle()
  // { openSearch }
  const history = useHistory()

  const { currentUser, setCurrentUser, setShowAlert } = props
  const isMenuOpen = Boolean(anchorEl)
  const isSignOpen = Boolean(signAnchorEL)

  const toHomePage = () => {
    history.push('/')
  }

  const toRegister = () => {
    history.push('/register')
  }

  const toLogin = () => {
    history.push('/login')
  }

  const toCreate = () => {
    history.push('/create')
  }

  const toHosted = () => {
    history.push('/hosted')
  }

  const toTotalProfit = () => {
    history.push('/profit')
  }

  const toUploadFile = () => {
    history.push('/uploadfile')
  }

  const showAlertMsg = (type, message) => {
    window.showAlert = true
    setShowAlert({ alertType: type, alertContent: message })
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSignOpen = (event) => {
    setSignAnchorEL(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSignAnchorEL(null)
  }

  const handleLogout = () => {
    fetchFunc('/user/auth/logout', 'POST').then((response) => {
      if (response.status !== 200) {
        showAlertMsg('error', 'network wrong')
        return
      }
      showAlertMsg('success', 'log out successfully')
      localStorage.removeItem('user')
      setCurrentUser(JSON.parse(localStorage.getItem('user')))
      history.push('/')
    })
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={'account-menu'}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        {currentUser && <Typography>{currentUser.email}</Typography>}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose()
          toCreate()
        }}
      >
        <Typography>Create new list</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose()
          toUploadFile()
        }}
      >
        <Typography>Create new list by upload json file</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose()
          toHosted()
        }}
      >
        <Typography>Hosted lists</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose()
        }}
      >
        <Typography>Messages</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose()
          toTotalProfit()
        }}
      >
        <Typography>My profit</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose()
          handleLogout()
        }}
      >
        <Typography>Logout</Typography>
      </MenuItem>
    </Menu>
  )

  const renderSign = (
    <Menu
      anchorEl={signAnchorEL}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={'sign-menu'}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isSignOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Typography onClick={toRegister}>Register</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography onClick={toLogin}>Login</Typography>
      </MenuItem>
    </Menu>
  )

  // const [modalStyle] = React.useState(getModalStyle)
  // const [openModel, setOpenAdvancedSearchModel] = React.useState(false)
  // const handleAdvancedSearchOpen = () => {
  //   setOpenAdvancedSearchModel(true)
  // }
  // const handleAdvancedSearchClose = () => {
  //   setOpenAdvancedSearchModel(false)
  // }
  // const [valueNumBed, setValueNumBed] = React.useState([1, 3])
  // const handleChangeNumBed = (event, newValue) => {
  //   setValueNumBed(newValue)
  // }
  // const [valuePrice, setValuePrice] = React.useState([0, 100])
  // const handleChangePrice = (event, newValue) => {
  //   setValuePrice(newValue)
  // }
  // // 这里获取值哦。所以需要针对不同的numberbed还是price来修改
  // function valuetext (value) {
  //   return `${value}`
  // }
  // const [valueDate, setValueDate] = React.useState(
  //   new Date('2021-08-18T21:11:54')
  // )
  // const handleChangeDate = (newValue) => {
  //   setValueDate(newValue)
  // }
  // const body = (
  //   <div style={modalStyle} className={styles.paper}>
  //     <h3 id='simple-modal-title'>Advanced Search</h3>
  //     <Typography id='discrete-slider' gutterBottom>
  //       Number of bedrooms:
  //     </Typography>
  //     <Slider
  //       value={valueNumBed}
  //       onChange={handleChangeNumBed}
  //       valueLabelDisplay='auto'
  //       aria-labelledby='range-slider'
  //       // 这里获取值哦
  //       getAriaValueText={valuetext}
  //       min={1}
  //       max={10}
  //       step={1}
  //     />
  //     <Typography id='discrete-slider' gutterBottom>
  //       Date range:
  //     </Typography>
  //     <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //       <KeyboardDatePicker
  //         disableToolbar
  //         variant='inline'
  //         format='MM/dd/yyyy'
  //         margin='normal'
  //         id='date-picker-inline'
  //         label='Start time'
  //         value={valueDate}
  //         onChange={handleChangeDate}
  //         KeyboardButtonProps={{
  //           'aria-label': 'change date',
  //         }}
  //       />
  //       <KeyboardDatePicker
  //         disableToolbar
  //         variant='inline'
  //         format='MM/dd/yyyy'
  //         margin='normal'
  //         id='date-picker-inline'
  //         label='End time'
  //         value={valueDate}
  //         onChange={handleChangeDate}
  //         KeyboardButtonProps={{
  //           'aria-label': 'change date',
  //         }}
  //       />
  //     </MuiPickersUtilsProvider>

  //     <Typography id='discrete-slider' gutterBottom>
  //       Price:
  //     </Typography>
  //     <Slider
  //       value={valuePrice}
  //       onChange={handleChangePrice}
  //       valueLabelDisplay='auto'
  //       aria-labelledby='range-slider'
  //       // 这里获取值哦
  //       getAriaValueText={valuetext}
  //       min={0}
  //       max={1000}
  //       step={50}
  //     />
  //     <Typography id='discrete-slider' gutterBottom>
  //       Review ratings:这里的表达形式是怎么样的？
  //     </Typography>
  //     <br />
  //     <Grid container justify='center'>
  //       <Button
  //         variant='contained'
  //         color='primary'
  //         size='medium'
  //         style={{
  //           maxWidth: '90px',
  //           maxHeight: '40px',
  //           minWidth: '90px',
  //           minHeight: '40px',
  //         }}
  //       >
  //         Search
  //       </Button>
  //       <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
  //       <Button
  //         variant='contained'
  //         color='primary'
  //         size='medium'
  //         style={{
  //           maxWidth: '90px',
  //           maxHeight: '40px',
  //           minWidth: '90px',
  //           minHeight: '40px',
  //         }}
  //         onClick={handleAdvancedSearchClose}
  //       >
  //         Close
  //       </Button>
  //     </Grid>
  //   </div>
  // )

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar className={styles.toolbar}>
          <Typography variant='h6' className={styles.logo} onClick={toHomePage}>
            Home
          </Typography>

          <Search />

          {/* 这里是search部分 */}
          {/* <div className={styles.search}>
            {currentUser && (
              <>
                <LocationCityIcon />
                <InputBase placeholder='City' className={styles.input} />
                <Divider orientation='vertical' flexItem />
                <TocIcon />
                <InputBase placeholder='Title' className={styles.input} />
                <SearchIcon />
              </>
            )}
            {!currentUser && (
              <>
                <LocationCityIcon />
                <InputBase
                  placeholder='Please login'
                  className={styles.input}
                  disabled
                />
                <Divider orientation='vertical' flexItem />
                <TocIcon />
                <InputBase
                  placeholder='Please login'
                  className={styles.input}
                  disabled
                />
                <SearchIcon />
              </>
            )}
            <CancelIcon
              className={styles.cancel}
              onClick={() => {
                setOpenSearch(false)
              }}
            />
          </div>
          <Button
            variant='contained'
            color='primary'
            onClick={handleAdvancedSearchOpen}
          >
            Advanced Search
          </Button>
          <Modal
            open={openModel}
            onClose={handleAdvancedSearchClose}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            {body}
          </Modal> */}
          {/* 这里是search部分 */}
          <div className={styles.icons}>
            {/* <IconButton
              className={styles.searchButton}
              onClick={() => {
                setOpenSearch(true)
              }}
            >
              <SearchIcon />
            </IconButton> */}
            {currentUser && (
              <div className={styles.profile}>
                <IconButton
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={'account-menu'}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle fontSize='large' />
                </IconButton>
              </div>
            )}
            {!currentUser && (
              <div className={styles.buttons}>
                <IconButton
                  edge='end'
                  aria-label='register and log in'
                  aria-controls={'sign-menu'}
                  aria-haspopup='true'
                  onClick={handleSignOpen}
                  color='inherit'
                >
                  <LockOpenIcon fontSize='large' />
                </IconButton>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderSign}
    </div>
  )
}

export default Navbar
Navbar.propTypes = {
  currentUser: PropTypes.any,
  setCurrentUser: PropTypes.any,
  setShowAlert: PropTypes.any,
}
