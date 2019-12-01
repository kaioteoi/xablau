import React, {useState, useEffect} from 'react';

import { withRouter } from "react-router";

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import SwipeableViews from 'react-swipeable-views';

import Reactions from './Reactions';
import PlaceCard from './PlaceCard';

import image1 from "./apartment_1.jpg";

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

const mockData = [{
    // fields: {
    price: "R$ 1.760.000,00",
    estimatedCommute: "30 min",
    imagePath: image1,
    address: {
        street: "Alameda Jaú",
        number: "1780",
        complement: "Apto 41",
        vicinity: "Jardim Paulista"
    }
    // }
}];

function Matcher(props) {
    console.log(props);
    const classes = useStyles();
    const [places, setPlaces] = useState([]);
    const [swiperIndex, setSwiperIndex] = useState(0);

    const handleSwiperIndexChange = index => {
        setSwiperIndex(index);
    };

    const getPlaces = () => {
        // TODO: receive API response here
        setPlaces(mockData);
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
                    <Grid container direction="column" justify="center" xs={12} md={8}>
                        <SwipeableViews
                            index={swiperIndex}
                            onSwitching={handleSwiperIndexChange}
                            enableMouseEvents
                        >
                            {places.map((place, index) => <PlaceCard key={`place-card-${index}`} place={place}/>)}
                        </SwipeableViews>
                        <Reactions handleOnRateClick={() => setSwiperIndex(swiperIndex + 1)}/>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

Matcher.displayName = 'Matcher';

export default withRouter(Matcher);
