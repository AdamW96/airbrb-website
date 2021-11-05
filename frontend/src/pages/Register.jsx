import * as React from 'react'
import { useHistory } from 'react-router'
import fetchFunc from '../services/fetchService'
import AlertMsg from '../components/AlertMsg'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons//LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

const toHomePage = (history) => {
  history.push('/')
}
const toLogin = (history) => {
  history.push('/login')
}
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

const registerFunction = (email, password, name, showAlert) => {
  // fetch('http://localhost:5005/user/auth/register', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     email: email,
  //     password: password,
  //     name: name,
  //   }),
  // })

  if (!checkValidName(name)) {
    showAlert('error', 'input valid name')
    return
  } else if (!checkValidEmail(email)) {
    showAlert('error', 'Please input valid email')
    return
  }
  // else if (!checkStrongPassword(password)) {
  //   showAlert('error', 'Please input strong password')
  //   return
  // }
  const data = { email, password, name }
  console.log(data)
  fetchFunc('/user/auth/register', 'POST', data).then((response) => {
    if (response.status !== 200) {
      showAlert('error', 'This email has been used, change a new one')
    } else {
      showAlert('success', 'Register successfully')
    }
  })
}

const theme = createTheme()

export default function Register () {
  const history = useHistory()
  const [alertState, setAlertState] = React.useState({
    alertType: 'info',
    alertContent: 'No data',
  })

  const showAlert = (type, message) => {
    window.showAlert = true
    setAlertState({ alertType: type, alertContent: message })
  }
  const handleSubmit = (event) => {
    console.log('come to handle submit')
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('firstName') + data.get('lastName')
    console.log(name, data.get('password'))
    registerFunction(data.get('email'), data.get('password'), name, showAlert)
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
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
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link
                    variant='body2'
                    onClick={() => {
                      toLogin(history)
                    }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <br />
          <Box id='Copyright'>
            <Typography variant='body2' color='text.secondary' align='center'>
              {'Copyright © '}
              <Link color='inherit' onClick={() => {
                toHomePage(history)
              }}>
                Airbnb
              </Link>
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
      <AlertMsg {...alertState} />
    </React.Fragment>
  )
}
