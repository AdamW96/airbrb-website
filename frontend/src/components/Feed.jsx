import { Container, makeStyles } from '@material-ui/core';
// import { Person } from '@material-ui/icons';
import Post from './Post';
import React from 'react'

const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));
function Feed () {
  const styles = useStyle();

  return (
    <Container className={styles.container}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Container>
  );
}

export default Feed;
