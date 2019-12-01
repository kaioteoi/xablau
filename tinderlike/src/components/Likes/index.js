import React, {useState, useEffect} from "react";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import PlaceCard from '../Matcher/PlaceCard';

const Likes = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const cookie = window.localStorage.getItem('cookie');

    if (cookie) {
      axios.get('http://localhost:8000/api/get_saved_places', {
        params: {
          c: cookie
        }
      })
      .then(resp => {
        setLikes(resp.data)
      })
      .catch(error => {
        console.log(error);
      });
    }
    // eslint-disable-next-line
  }, []);


  return (
    <Grid container direction="column" justify="center" alignItems="center" xs={12}>
      {likes.map((place, index) => (
        <PlaceCard key={`place-card-${index}`} place={place}/>
      ))}
    </Grid>
  )
};


export default Likes;
