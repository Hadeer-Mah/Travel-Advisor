import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react'
import useStyles from './styles'
import GoogleMapReact from 'google-map-react';
import { Rating } from '@material-ui/lab';
import { LocationOnOutlined } from '@material-ui/icons';

const Map = ({coordinates, setCoordinates, setBounds, places, setChildSelected}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width: 600px)');
  return (
    <>
    <div className={classes.mapContainer}>
      <GoogleMapReact 
          bootstrapURLKeys={{key: 'AIzaSyCjx0VcQOSzfyAtO--jUTcRIHtwnjT76fQ'}} 
          defaultCenter={coordinates} 
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
          onChange={(e)=>{
            setCoordinates({lat: e.center.lat, lng: e.center.lng});
            setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
          }}
          onChildClick={(child)=> setChildSelected(child)}
          >
            {places?.map((place, i) => (
          <div
            className={classes.marker}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop
              ? <LocationOnOutlined color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}

      </GoogleMapReact>
    </div>
    </>
  )
}

export default Map