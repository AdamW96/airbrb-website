import * as React from 'react'
import { useHistory } from 'react-router'
import fetchFunc from '../services/fetchService'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  link: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

const loginFunction = (email, password, showAlert, goHomePage, setCurrentUser) => {
  const data = { email, password }
  console.log(data)
  fetchFunc('/user/auth/login', 'POST', data).then((response) => {
    console.log('response ===>', response)
    if (response.status !== 200) {
      console.log('sign in error', response)
      showAlert('error', 'invalid email or password')
      return
    }
    response.json().then((data) => {
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data))
      setCurrentUser(JSON.parse(localStorage.getItem('user')))
      showAlert('success', 'Log in successfully')
      goHomePage()
    })
  })
}

function Login (props) {
  const history = useHistory()
  const { setCurrentUser, setShowAlert } = props

  const styles = useStyle()
  const goHomePage = () => {
    history.push('/')
  }

  const goRegister = () => {
    history.push('/register')
  }

  const showAlert = (type, message) => {
    setShowAlert({ alertType: type, alertContent: message })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    loginFunction(
      data.get('email'),
      data.get('password'),
      showAlert,
      goHomePage,
      setCurrentUser
    )
    console.log(data.get('email') + data.get('password'))
  }

  return (
    <Container className={styles.container} component='main' maxWidth='xs'>
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
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            color='primary'
          >
            Sign In
          </Button>
          <br />
          <br />
          <Grid container>
            <Grid item>
              <Link onClick={goRegister} variant='body2' className={styles.link}>
                 {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <br />
      <Box id='copyright'>
        <Typography variant='body2' align='center'>
          {'Copyright © '}
          <Link color='inherit' onClick={goHomePage} className={styles.link}>
            Airbnb
          </Link>
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>
  )
}

export default Login

Login.propTypes = {
  setCurrentUser: PropTypes.any,
  setShowAlert: PropTypes.any,
}
