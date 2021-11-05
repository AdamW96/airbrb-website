import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React from 'react'
import imgURL from '../images/house1.jpg'
// import fetchFunc from '../services/fetchService'

const useStyle = makeStyles((theme) => ({
  cardContainer: {
    marginBottom: theme.spacing(4)
  },
}))

// const lists = () => {
//   fetchFunc()
// }

function HomeLists () {
  const styles = useStyle()
  return (
    <Card className={styles.cardContainer}>
      <CardActionArea>
        <CardMedia
          className={styles.meida}
          component='img'
          height='250'
          image={imgURL}
          title='House1'
        />
        <CardContent>
          <Typography variant='h5'>first house</Typography>
          <Typography variant='body1'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed sequi
            ratione placeat laudantium a dolores quia quae distinctio adipisci
            in alias mollitia, reprehenderit, culpa ullam hic tempora magnam
            nostrum nulla?
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">Share</Button>
        <Button size="small" color="primary">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default HomeLists
