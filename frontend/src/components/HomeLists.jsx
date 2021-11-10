import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import fetchFunc from '../services/fetchService'
import PropTypes from 'prop-types';

const checkImageOrVedio = (thumbnail) => {
  return thumbnail.startsWith('data:image');
}

function ListingBody ({ title, numReviews, price, thumbnail }) {
  console.log(thumbnail);
  return (
    <Card sx={{ maxWidth: 345 }}>
      {checkImageOrVedio(thumbnail) && (
        <>
        <CardMedia
          component="img"
          height="310"
          image={thumbnail}
          alt="green iguana"
        />
        </>
      )}
      {!checkImageOrVedio(thumbnail) && (
        <div style= { { 'text-align': 'center' } }>
        <iframe
          width="420"
          height="315"
          text-align='center'
          title="YouTube video player"
          src={thumbnail}
          allowFullScreen>
        </iframe>
        </div>
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary" align='center'>
          <b>🔹 Title:{'  '}</b>{title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align='center'>
          <b>🔹 Number of reviews:{'  '}</b>{numReviews}
        </Typography>
        <Typography variant="body2" color="text.secondary" align='center'>
          <b>🔹 Price:{'  '}</b>${price}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
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
