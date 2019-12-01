import React, {useState, useEffect} from 'react';

import {withRouter} from "react-router";
import {useHistory} from 'react-router-dom';

import axios from '../../api';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Reactions from './Reactions';
import PlaceCard from './PlaceCard';
import {hasKeys, buildRequest, getIdentifier} from 'api/local-storage';
import PATHS from 'components/constants';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    maxHeight: {
        height: "100%"
    }
}));

function Matcher() {
    const classes = useStyles();
    const [places, setPlaces] = useState([]);
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const handleFavoriteOnClick = index => {
        if (index < places.length) {
            setIndex(index + 1);
            saveFavorite(index)
        }
    };

    const saveFavorite = (index) => {
        const place = places[index];
        const data = {
            places: [place.place_id],
            cookie: getIdentifier()
        };

        axios.post(`/api/save_places/`, data)
            .then(() => {})
            .catch(error => console.log(error));
    };

    const getPlaces = () => {
        if (hasKeys()) {
            axios.post('/api/onboarding/', buildRequest())
                .then(response => {
                    setPlaces(response.data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false))
        } else {
            history.push(PATHS.ONBOARDING);
        }
    };

    useEffect(() => {
        getPlaces();
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <Container className={classes.maxHeight}>
                <Grid
                    container
                    className={classes.maxHeight}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    xs={12}
                >
                    <Grid container direction="row" justify="center">
                        {isLoading && <CircularProgress color="primary"/>}
                        {!isLoading && (
                            <>
                                <Grid item xs={12} md={8}>
                                    {places.length > 0 && (
                                        <PlaceCard key={`place-card-${index}`} place={places[index]}/>
                                    )}
                                </Grid>
                                < Reactions
                                    handleFavoriteOnClick={() => {
                                        handleFavoriteOnClick(index);
                                    }}
                                    handleDislikeOnClick={() => {
                                        setIndex(index + 1);
                                    }}
                                />
                            </>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

Matcher.displayName = 'Matcher';

export default withRouter(Matcher);
