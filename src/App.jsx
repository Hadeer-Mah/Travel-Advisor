import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { CssBaseline, Grid } from '@material-ui/core'
import { getPlacesData } from './api/data'
import { useEffect, useState } from 'react'
function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childSelected, setChildSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [ratedPlaces, setRatedPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({lat: latitude, lng:longitude})
    })
  }, []);
  useEffect(() => {
    const rated = places.filter((place) => Number(place.rating) > rating);

    setRatedPlaces(rated);
  }, [rating]);

  
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne).then((data)=>{
      setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
      setRatedPlaces([]);
      setRating('');
      setIsLoading(false);
    });
  }
  }, [type, bounds]);
  
  const onLoad = (search) => setAutocomplete(search);

  const onPlaceChange = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };
  
  return (
    <>
    <CssBaseline/>
    <Header onPlaceChange={onPlaceChange} onLoad={onLoad}/>
    <Grid container spacing={3} style={{width: '100%', margin: '0'}}>
      <Grid item xs={12} md={4}>
        <List places={ratedPlaces.length ? ratedPlaces :places} childSelected={childSelected} isLoading={isLoading}
        type={type} setType={setType} rating={rating} setRating={setRating}/>
      </Grid>
      <Grid item xs={12} md={8}>
        <Map 
        coordinates={coordinates} setCoordinates={setCoordinates}
         setBounds={setBounds} places={ratedPlaces.length ? ratedPlaces :places}
         setChildSelected={setChildSelected}/>
      </Grid>
    </Grid>
    
    </>
  );
}

export default App;
