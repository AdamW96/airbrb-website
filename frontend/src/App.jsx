import { Grid, makeStyles } from '@material-ui/core';
import Leftbar from './components/Leftbar';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Rightbar from './components/Rightbar';
import AddNew from './components/AddNew'
import React from 'react'

const useStyle = makeStyles((theme) => ({
  rightbar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function App () {
  const styles = useStyle();

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={7} xs={10}>
          <Feed />
        </Grid>
        <Grid item sm={3} className={styles.rightbar}>
          <Rightbar />
        </Grid>
      </Grid>
      <AddNew />
    </div>
  );
}

export default App;
