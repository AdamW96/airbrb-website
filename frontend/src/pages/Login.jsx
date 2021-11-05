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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createTheme()

const loginFunction = (email, password, showAlert, goHomePage) => {
  // fetch('http://localhost:5005/user/auth/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     email: email,
  //     password: password,
  //   })
  // })
  const data = { email, password }
  fetchFunc('/user/auth/login', 'POST', data).then((response) => {
    console.log(response.status)
    if (response.status !== 200) {
      showAlert('error', 'invalid email or password')
      return
    }
    response.json().then((data) => {
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data))
      goHomePage()
    })
  })
}

function Login () {
  const history = useHistory()
  const [alertState, setAlertState] = React.useState({
    alertType: 'info',
    alertContent: 'No data',
  })

  const goHomePage = () => {
    history.push('/')
  }
  const showAlert = (type, message) => {
    window.showAlert = true
    setAlertState({ alertType: type, alertContent: message })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    loginFunction(data.get('email'), data.get('password'), showAlert, goHomePage)
    console.log(data.get('email') + data.get('password'))
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
              Sign in
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <br />
              <br />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <br />
              <br />
              <Button
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                href='/'
              >
                Close
              </Button>
              <Grid container>
                <Grid item>
                  <Link to='/register' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <br />
          <Box id='copyright'>
            <Typography variant='body2' color='text.secondary' align='center'>
              {'Copyright © '}
              <Link color='inherit' onClick={goHomePage}>
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

export default Login
