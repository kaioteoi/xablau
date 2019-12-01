import React, {useState, useEffect} from "react";
import axios from '../../api';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PlaceCard from '../Matcher/PlaceCard';

const Likes = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const cookie = window.localStorage.getItem('cookie');

    if (cookie) {
      axios.get('/api/get_saved_places', {
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
      <Grid container spacing={3}>
      <Typography variant="h4">Os queridinhos</Typography>
        {likes.map((place, index) => (
          <Grid key={`place-card-${index}`} item xs={12}>
            <PlaceCard place={place}/>
          </Grid>
        ))}
      </Grid>
  )
};


export default Likes;
