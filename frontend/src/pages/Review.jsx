import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
} from '@material-ui/core'
import fetchFunc from '../services/fetchService'
import { useHistory } from 'react-router'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Review () {
  const { id } = useParams();
  const { listID } = useParams();
  const classes = useStyles();
  const [scoreValue, setValue] = React.useState(0);
  const [commentValue, setComment] = React.useState('');
  const reviewData = {
    review: {
      score: scoreValue,
      comment: commentValue,
    }
  }
  const history = useHistory()
  const goListingPage = () => {
    const location = '/listings/' + listID
    history.push(location)
  }
  const fetchFunction = (listingid, bookingid, reviewdata) => {
    fetchFunc(`/listings/${listingid}/review/${bookingid}`, 'PUT', reviewdata).then((response) => {
      console.log(reviewdata);
      if (response.status !== 200) {
        console.log('error', response)
        return
      }
      response.json().then((data) => {
        console.log(response);
      })
    })
  }
  return (
    <Grid container justifyContent='center' style={{ marginTop: 100 }}>
    <Card className={classes.root} variant="outlined" style={{ width: '60%' }} >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align='center'>
          Please input your comments at here
        </Typography>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">SCORE</Typography>
          <Rating
            name="simple-controlled"
            value={scoreValue}
            id='rating'
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
        <TextField
          id="commentContent"
          label="COMMENTS"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          // value={commentValue}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
      </CardContent>
      <CardActions>
        <Grid container justifyContent="center">
          <Button
          variant="contained"
          color="primary"
          size='medium'
          style= {{ maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px' }}
          onClick={() => {
            fetchFunction(listID, id, reviewData);
            goListingPage(listID);
          }
          }
          >
            SUBMIT
          </Button>
        </Grid>
      </CardActions>
    </Card>
    </Grid>
  );
}
