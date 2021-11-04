import { Container, Typography, makeStyles } from '@material-ui/core'
// import { Person } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import ListIcon from '@material-ui/icons/List'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { React } from 'react'
import { Link } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    height: '100vh',
    color: 'white',
    position: 'sticky',
    top: '0',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      backgroundColor: 'white',
      color: '#555',
      border: '1px solid #c9c8cb',
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary,
  },
  item: {
    display: 'flex',
    marginBottom: theme.spacing(4),
    '&hover': {
      cursor: 'pointer',
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
      cursor: 'pointer',
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      fontSize: '18px',
    },
  },
  text: {
    fontWeight: '500',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

function Leftbar () {
  const styles = useStyle()

  return (
    <Container className={styles.container}>
      <Link to='/' style={{ textDecoration: 'none', color: '#3f51b5' }}>
        <div className={styles.item}>
          <HomeIcon className={styles.icon} />
          <Typography className={styles.text}>HomePage</Typography>
        </div>
      </Link>

      <Link to='/' style={{ textDecoration: 'none', color: '#3f51b5' }}>
        <div className={styles.item}>
          <PersonIcon className={styles.icon} />
          <Typography className={styles.text}>Profile</Typography>
        </div>
      </Link>

      <Link to='/' style={{ textDecoration: 'none', color: '#3f51b5' }}>
        <div className={styles.item}>
          <ListIcon className={styles.icon} />
          <Typography className={styles.text}>MyLists</Typography>
        </div>
      </Link>

      <Link to='/register' style={{ textDecoration: 'none', color: '#3f51b5' }}>
        <div className={styles.item}>
          <ExitToAppIcon className={styles.icon} />
          <Typography className={styles.text}>Register</Typography>
        </div>
      </Link>

      <Link to='/login' style={{ textDecoration: 'none', color: '#3f51b5' }}>
        <div className={styles.item}>
          <ExitToAppIcon className={styles.icon} />
          <Typography className={styles.text}>Login</Typography>
        </div>
      </Link>
      <Link to='/' style={{ textDecoration: 'none', color: '#3f51b5' }}>
        <div className={styles.item}>
          <ExitToAppIcon className={styles.icon} />
          <Typography className={styles.text}>Logout</Typography>
        </div>
      </Link>
    </Container>
  )
}

export default Leftbar
