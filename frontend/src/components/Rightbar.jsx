import { Container, makeStyles } from '@material-ui/core';
// import { Person } from '@material-ui/icons';
// import HomeIcon from '@material-ui/icons/Home';
import { React } from 'react';

const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

function Rightbar () {
  const styles = useStyle();

  return (
    <Container className={styles.container}>
      <div>right part</div>
    </Container>
  );
}

export default Rightbar;
