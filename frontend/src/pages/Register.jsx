import * as React from 'react'
import { useHistory } from 'react-router'
import fetchFunc from '../services/fetchService'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Container,
  makeStyles,
} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons//LockOutlined'
import Typography from '@material-ui/core/Typography'
// import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  signup: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  link: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
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
const checkStrongPassword = (password) => {
  const rePassword = /(?=.*[a-z])(?=.*[A-Z])/
  return rePassword.test(password)
}

const registerFunction = (
  email,
  password,
  confirmPwd,
  name,
  showAlertMsg,
  history,
  setCurrentUser
) => {
  if (!checkValidName(name)) {
    showAlertMsg('error', 'input valid name')
    return
  } else if (!checkValidEmail(email)) {
    showAlertMsg('error', 'Please input valid email')
    return
  } else if (!checkStrongPassword(password)) {
    showAlertMsg(
      'error',
      'Please input strong password, with one One upper case and one lower case at least 8 characters'
    )
    return
  }
  if (password !== confirmPwd) {
    showAlertMsg('error', 'Make sure two passwords are same')
    return
  }
  const data = { email, password, name }
  fetchFunc('/user/auth/register', 'POST', data).then((response) => {
    if (response.status !== 200) {
      showAlertMsg('error', 'This email has been used, change a new one')
      return
    }
    response.json().then((data) => {
      showAlertMsg('success', 'Register successfully')
      const userData = { token: data.token, email: email }
      localStorage.setItem('user', JSON.stringify(userData))
      setCurrentUser(JSON.parse(localStorage.getItem('user')))
      history.push('/')
    })
  })
}

export default function Register (props) {
  const { setCurrentUser, setShowAlert } = props
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [emailState, setEmailState] = React.useState('')
  const history = useHistory()
  const styles = useStyle()

  const toHomePage = () => {
    history.push('/')
  }
  const toLogin = () => {
    history.push('/login')
  }

  const showAlertMsg = (type, content) => {
    setShowAlert({ alertType: type, alertContent: content })
  }

  const handleFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastName = (e) => {
    setLastName(e.target.value)
  }

  const handleEmail = (e) => {
    setEmailState(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = (event) => {
    const name = `${firstName} ${lastName}`
    const pwd = password
    const confirmPwd = confirmPassword
    const email = emailState
    registerFunction(
      email,
      pwd,
      confirmPwd,
      name,
      showAlertMsg,
      history,
      setCurrentUser
    )
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
        <Box sx={{ mt: 3 }}>
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
                onChange={handleFirstName}
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
                onChange={handleLastName}
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
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor='component-helper'>Password</InputLabel>
                <Input
                  required
                  type='password'
                  id='password'
                  name='password'
                  value = {password}
                  onChange={handlePassword}
                  aria-describedby='component-helper-text'
                />
                <FormHelperText
                  id='component-helper-text'
                  style={{ color: 'red' }}
                >
                  Password must with one One upper case and one lower case at
                  least 8 characters
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Your Password'
                type='password'
                id='confirmPassword'
                autoComplete='new-password'
                onChange={handleConfirmPassword}
              />
            </Grid>
          </Grid>
          <br />
          <Button
            type='button'
            fullWidth
            variant='contained'
            color='primary'
            className={styles.signup}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link variant='body2' onClick={toLogin} className={styles.link}>
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
          <Link color='inherit' onClick={toHomePage} className={styles.link}>
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
  setShowAlert: PropTypes.any,
  setCurrentUser: PropTypes.any,
}
