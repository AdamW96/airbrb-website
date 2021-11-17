import { Switch, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Create from './pages/Create'
import Hosted from './pages/Hosted'
import Edit from './pages/Edit'
import Navbar from './components/Navbar'
import AlertMsg from './components/AlertMsg'
import Listing from './pages/Listing'
import Requests from './pages/Requests'
import Review from './pages/Review'
import TotalProfit from './pages/TotalProfit'
import UploadFile from './pages/UploadFile'
import SearchRes from './pages/SearchRes'

// inital global part
function App () {
  const [currentUser, setCurrentUser] = React.useState(
    JSON.parse(localStorage.getItem('user'))
  )
  const [searchResList, setSearchResList] = React.useState([])
  const [showAlert, setShowAlert] = React.useState({
    alertType: 'none',
    alertContent: '',
  })
  return (
    <div>
      <Navbar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setShowAlert={setShowAlert}
        setSearchResList={setSearchResList}
      />
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
        <Route path='/create' exact>
          <Create
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowAlert={setShowAlert}
          />
        </Route>
        <Route path='/hosted' exact>
          <Hosted
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowAlert={setShowAlert}
          />
        </Route>
        <Route path='/edit/:id' exact>
          <Edit
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowAlert={setShowAlert}
          />
        </Route>
        {/* 加的点击某个房源，然后查看具体信息 */}
        <Route path='/listings/:id' exact>
          <Listing
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowAlert={setShowAlert}
          />
        </Route>
        <Route path='/requests/:listingId' exact>
          <Requests
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowAlert={setShowAlert}
          />
        </Route>
        {/* 根据ID写review */}
        <Route path='/review/:id/:listID' exact>
          <Review
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowAlert={setShowAlert}
          />
        </Route>
        {/* 用图表计算总盈利 */}
        <Route path='/profit' exact>
          <TotalProfit
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowAlert={setShowAlert}
          />
        </Route>
        {/* 上传json文件来创建新房源 */}
        <Route path='/uploadfile' exact>
          <UploadFile
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowAlert={setShowAlert}
          />
        </Route>
        <Route path='/searchResult' exact>
          <SearchRes searchResList={searchResList}/>
        </Route>
      </Switch>
      <AlertMsg {...showAlert} />
    </div>
  )
}

export default App
