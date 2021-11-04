import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  InputBase,
  alpha,
  Badge,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import CancelIcon from '@material-ui/icons/Cancel';
import { React, useState } from 'react';

const useStyle = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  logoLg: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logoSm: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      display: (props) => (props.open ? 'flex' : 'none'),
      width: '60%',
    },
  },
  input: {
    color: 'white',
    marginLeft: theme.spacing(1),
  },
  cancel: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  icons: {
    display: (props) => (props.open ? 'none' : 'flex'),
    alignItems: 'center',
  },
  badge: {
    marginRight: theme.spacing(2),
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

function Navbar () {
  const [open, setOpen] = useState(false);
  const styles = useStyle({ open });

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" className={styles.logoLg}>
            Airbnb
          </Typography>
          <Typography variant="h6" className={styles.logoSm}>
            Mobile
          </Typography>

          <div className={styles.search}>
            <SearchIcon />
            <InputBase placeholder="search..." className={styles.input} />
            <CancelIcon
              className={styles.cancel}
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
          <div className={styles.icons}>
            <Badge
              className={styles.searchButton}
              onClick={() => {
                setOpen(true);
              }}
            >
              <SearchIcon />
            </Badge>
            <Badge variant="dot" color="secondary" className={styles.badge}>
              <MailIcon />
            </Badge>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
