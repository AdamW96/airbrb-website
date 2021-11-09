import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import fetchFunc from '../services/fetchService'
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  InputBase,
  alpha,
  Menu,
  MenuItem,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CancelIcon from '@material-ui/icons/Cancel'
import AccountCircle from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import LockOpenIcon from '@material-ui/icons/LockOpen'

import PropTypes from 'prop-types'

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
  icons: {
    display: (props) => (props.openSearch ? 'none' : 'flex'),
    alignItems: 'center',
  },
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
}))

function Navbar (props) {
  const [openSearch, setOpenSearch] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [signAnchorEL, setSignAnchorEL] = useState(null)
  const styles = useStyle({ openSearch })
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
      console.log('this is response', response)
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
      <MenuItem onClick={handleMenuClose}>
        <Typography onClick={toCreate}>Create new list</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography onClick={toHosted}>Hosted lists</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography >Book lists</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography >Messages</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography >My profit</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography onClick={handleLogout}>Logout</Typography>
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
        <Typography onClick={toRegister}>
          Register
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography onClick={toLogin}>
          Login
        </Typography>
      </MenuItem>
    </Menu>
  )

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar className={styles.toolbar}>
          <Typography variant='h6' className={styles.logo} onClick={toHomePage}>
            Airbnb
          </Typography>

          <div className={styles.search}>
            <SearchIcon />
            {currentUser && (
              <InputBase placeholder='search' className={styles.input} />
            )}
            {!currentUser && (
              <InputBase
                disabled
                value='You must log in first'
                className={styles.input}
              />
            )}
            <CancelIcon
              className={styles.cancel}
              onClick={() => {
                setOpenSearch(false)
              }}
            />
          </div>
          <div className={styles.icons}>
            <IconButton
              className={styles.searchButton}
              onClick={() => {
                setOpenSearch(true)
              }}
            >
              <SearchIcon />
            </IconButton>
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
