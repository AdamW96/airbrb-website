import {
  Card,
  CardContent,
  Typography,
  ImageList,
  ImageListItem,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import fetchFunc from '../services/fetchService'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const checkImageOrVedio = (thumbnail) => {
  return thumbnail.startsWith('data:image');
}

const getAllImage = (thumbnail) => {
  const allIMage = thumbnail.split(' ');
  allIMage.pop();
  return allIMage;
}

function ListingBody ({ title, numReviews, price, thumbnail }) {
  const classes = useStyles();
  return (
    <div>
    <Card sx={{ maxWidth: 345 }}>
      {checkImageOrVedio(thumbnail) && (
        <div className={classes.root}>
          <ImageList className={classes.imageList} cols={1}>
            {getAllImage(thumbnail).map((imageBase64) => {
              return (
                <ImageListItem key={imageBase64}>
                <img src={imageBase64} alt="Image of listings"/>
                </ImageListItem>
              )
            })}
          </ImageList>
        </div>
      )}
      {!checkImageOrVedio(thumbnail) && (
        <div style= { { 'text-align': 'center' } }>
        <iframe
          width="420"
          height="315"
          textalign='center'
          title="YouTube video player"
          src={thumbnail}
          allowFullScreen>
        </iframe>
        </div>
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" align='center'>
          <b>🔹 Title:{'  '}</b>{title}
        </Typography>
        <Typography variant="body2" color="textSecondary" align='center'>
          <b>🔹 Number of reviews:{'  '}</b>{numReviews}
        </Typography>
        <Typography variant="body2" color="textSecondary" align='center'>
          <b>🔹 Price:{'  '}</b>${price}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    <br />
    </div>

  )
}
ListingBody.propTypes = {
  title: PropTypes.string.isRequired,
  numReviews: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
}

const useFetch = () => {
  const [response, setResponse] = useState({});
  useEffect(() => {
    fetchFunc('/listings', 'GET').then((response) => {
      if (response.status !== 200) {
        console.log('error', response)
        return
      }
      response.json().then((data) => {
        setResponse(data.listings);
      })
    })
  }, []);
  return { response };
}

function HomeLists () {
  const allListings = useFetch().response;
  return (
    <div id="body1">
      {Object.keys(allListings).map(function (key) {
        return (< ListingBody key={allListings[key].id} title={allListings[key].title} numReviews={allListings[key].reviews.length} price={allListings[key].price} thumbnail={allListings[key].thumbnail} />)
      })}
    </div>
  )
}

export default HomeLists
