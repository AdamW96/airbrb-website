import { Container, makeStyles } from '@material-ui/core';
// import { Person } from '@material-ui/icons';
import React from 'react'
import HomeLists from '../components/HomeLists'
const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));
function Home () {
  const styles = useStyle();

  return (
    <Container className={styles.container}>
      <HomeLists />
    </Container>
  );
}

export default Home;
