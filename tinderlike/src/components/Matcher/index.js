import React, {useState, useEffect} from 'react';

import {withRouter} from "react-router";

import axios from 'axios';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import SwipeableViews from 'react-swipeable-views';
import {bindKeyboard} from 'react-swipeable-views-utils';

import Reactions from './Reactions';
import PlaceCard from './PlaceCard';
import {hasKeys, buildRequest} from 'api/local-storage';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

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
    const [swiperIndex, setSwiperIndex] = useState(0);

    const handleSwiperIndexChange = index => {
        setSwiperIndex(index);
    };

    const getPlaces = () => {
        if (hasKeys()) {
            axios.post('http://localhost:8000/api/onboarding/', buildRequest())
                .then(response => {
                    setPlaces(response.data);
                })
                .catch(error => console.log(error))
        }
    };

    useEffect(() => {
        getPlaces();
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <Container className={classes.maxHeight}>
                <Grid container className={classes.maxHeight} direction="column" justify="center" alignItems="center"
                      xs={12}>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={8}>
                            <BindKeyboardSwipeableViews
                                index={swiperIndex}
                                onSwitching={handleSwiperIndexChange}
                                enableMouseEvents
                                containerStyle={{padding: "10px"}}
                            >
                                {places.map((place, index) => <PlaceCard key={`place-card-${index}`} place={place}/>)}
                            </BindKeyboardSwipeableViews>
                        </Grid>
                        <Reactions handleOnRateClick={() => setSwiperIndex(swiperIndex + 1)}/>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

Matcher.displayName = 'Matcher';

export default withRouter(Matcher);
