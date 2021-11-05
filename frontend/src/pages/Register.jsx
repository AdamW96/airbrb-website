import * as React from 'react'
import { useHistory } from 'react-router'
import fetchFunc from '../services/fetchService'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons//LockOutlined'
import Typography from '@material-ui/core/Typography'
// import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Container, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10)
  },
  signup: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}))

// check validation of input
const checkValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
const checkValidName = (name) => {
  const regName = /[a-zA-Z]{2,20}/
  return regName.test(name)
}
// const checkStrongPassword = (password) => {
//   const rePassword = /(?=.*[a-z])(?=.*[A-Z])/
//   return rePassword.test(password)
// }

const registerFunction = (email, password, name, showAlertMsg) => {
  if (!checkValidName(name)) {
    showAlertMsg('error', 'input valid name')
    return
  } else if (!checkValidEmail(email)) {
    showAlertMsg('error', 'Please input valid email')
    return
  }
  const data = { email, password, name }
  console.log(data)
  fetchFunc('/user/auth/register', 'POST', data).then((response) => {
    if (response.status !== 200) {
      showAlertMsg('error', 'This email has been used, change a new one')
    } else {
      showAlertMsg('success', 'Register successfully')
    }
  })
}

export default function Register (props) {
  const { setShowAlert } = props
  const history = useHistory()
  const styles = useStyle()

  const toHomePage = () => {
    history.push('/')
  }
  const toLogin = () => {
    history.push('/login')
  }

  const showAlertMsg = (type, content) => {
    window.showAlert = true
    setShowAlert({ alertType: type, alertContent: content })
  }

  const handleSubmit = (event) => {
    console.log('come to handle submit')
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('firstName') + data.get('lastName')
    console.log(name, data.get('password'))
    registerFunction(data.get('email'), data.get('password'), name, showAlertMsg)
  }

  return (
    <Container className={styles.container} component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <br />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className = {styles.signup}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link
                variant='body2'
                onClick={toLogin}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <br />
      <Box id='Copyright'>
        <Typography variant='body2' color='' align='center'>
          {'Copyright © '}
          <Link
            color='inherit'
            onClick={() => {
              toHomePage()
            }}
          >
            Airbnb
          </Link>
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>
  )
}

Register.propTypes = {
  setShowAlert: PropTypes.any
}
