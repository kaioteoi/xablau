import React from "react";
import PropTypes from 'prop-types';

import {makeStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}));

function PlaceCard(props) {
    const {place} = props;
    const classes = useStyles();

    return (
        <div
        onClick={() => window.open(`https://loft.com.br/home/${place.place_id}`, '_blank')}>
            <Card>
            <CardMedia
                className={classes.media}
                image={place.photos[0]}
                title={place.place_id}
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography color="primary" variant="h6">
                            {`R$ ${place.price && place.price.toLocaleString('pt-br')}`}
                        </Typography>
                    </Grid>
                    {place.distance && (
                    <Grid container item xs justify="flex-end">
                        <Grid item>
                            <Typography variant="subtitle1" color="textSecondary" component="p">
                                <AccessTimeIcon color="primary"/> {Math.round(place.distance)} min
                            </Typography>
                        </Grid>
                    </Grid>
                    )}
                </Grid>
                <Grid container>
                    <Grid item>
                        <Typography variant="h5">
                            {place.stree_type} {place.street_name} {place.number && `, ${place.number}`}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography variant="h6" color="textSecondary"
                                    display="inline">{place.neighborhood}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6" color="textSecondary" display="inline">
                            {`${place.floor} andar`}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        </div>
    );
}

PlaceCard.displayName = 'PlaceCard';

PlaceCard.propTypes = {
    place: PropTypes.shape({
      photos: PropTypes.array,
      price: PropTypes.number,
      distance: PropTypes.string,
      street_name: PropTypes.string,
      street_type: PropTypes.string,
      number: PropTypes.number,
      floor: PropTypes.number,
      neighborhood: PropTypes.string
    }).isRequired
};

export default PlaceCard;
