import React from 'react'
import { Container, makeStyles } from '@material-ui/core';
import fetchFunc from '../services/fetchService'
import HostedLists from '../components/HostedLists';
import PropTypes from 'prop-types'
// inital global part

const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10)
  }
}));

function Hosted (props) {
  const styles = useStyle();
  const [listings, setListings] = React.useState([])
  const [fetchData, setFetchData] = React.useState(false)
  const { currentUser, setShowAlert } = props
  const showAlertMsg = (type, content) => {
    setShowAlert({ alertType: type, alertContent: content })
  }
  React.useEffect(() => {
    console.log('coming to effect')
    fetchFunc('/listings', 'GET').then(response => {
      if (response.status !== 200) {
        showAlertMsg('error', 'Can\'t get data')
        return
      }
      response.json().then((data) => {
        const detailListings = []
        const ownerListings = []
        const list = data.listings
        for (let i = 0; i < list.length; i++) {
          if (currentUser.email === list[i].owner) {
            ownerListings.push(list[i])
          }
        }
        for (let i = 0; i < ownerListings.length; i++) {
          const listId = ownerListings[i].id
          fetchFunc(`/listings/${listId}`, 'GET').then(response => {
            if (response.status !== 200) {
              return
            }
            response.json().then((data) => {
              const newData = { id: listId, ...data.listing }
              detailListings.push(newData)
              if (detailListings.length === ownerListings.length) {
                setListings(detailListings)
              }
            })
          })
        }
      })
    })
  }, [fetchData])
  React.useEffect(() => {
    console.log('final list==>', listings)
  }, [listings])

  return (
    <React.Fragment>
      <Container className={styles.container}>
        <HostedLists lists = {listings} setShowAlert={setShowAlert} setFetchData={setFetchData}></HostedLists>
      </Container>
    </React.Fragment>
  );
}

export default Hosted;

Hosted.propTypes = {
  setShowAlert: PropTypes.any,
  setCurrentUser: PropTypes.any,
  currentUser: PropTypes.any,
}
