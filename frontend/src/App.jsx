import { Switch, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Leftbar from './components/Leftbar'
import Rightbar from './components/Rightbar'
import AlertMsg from './components/AlertMsg'
import AddNew from './components/AddNew'

import { Grid, makeStyles } from '@material-ui/core'
// inital global part
window.showAlert = false

const useStyle = makeStyles((theme) => ({
  rightbar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

function App () {
  const [currentUser, setCurrentUser] = React.useState(
    JSON.parse(localStorage.getItem('user'))
  )
  const [showAlert, setShowAlert] = React.useState(function initialAlert () {
    return {
      alertType: 'none',
      alertContent: '',
    }
  })
  const styles = useStyle()
  return (
    <div>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowAlert={setShowAlert}
          />
        </Grid>
        <Grid item sm={7} xs={10}>
          <Switch>
            <Route path='/' exact>
              <Home
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setShowAlert={setShowAlert}
              />
            </Route>
            <Route path='/register' exact>
              <Register
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setShowAlert={setShowAlert}
              />
            </Route>
            <Route path='/login' exact>
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setShowAlert={setShowAlert}
              />
            </Route>
          </Switch>
        </Grid>
        <Grid item sm={3} className={styles.rightbar}>
          <Rightbar />
        </Grid>
      </Grid>
      <AddNew currentUser={currentUser} setShowAlert={setShowAlert}/>
      <AlertMsg {...showAlert} />
    </div>
  )
}

export default App
