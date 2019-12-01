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
        <Card>
            <CardMedia
                className={classes.media}
                image={place.imagePath}
                title="Paella dish"
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography color="primary" variant="h6">
                            {place.price}
                        </Typography>
                    </Grid>
                    <Grid container item xs justify="flex-end">
                        <Grid item>
                            <Typography variant="subtitle1" color="textSecondary" component="p">
                                <AccessTimeIcon color="primary"/> {place.estimatedCommute}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item>
                        <Typography variant="h5">
                            {place.address.street} {place.address.number && `, ${place.address.number}`}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography variant="h6" color="textSecondary" display="inline">{place.address.tag}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6" color="textSecondary"
                                    display="inline">{place.address.vicinity}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6" color="textSecondary"
                                    display="inline">{place.address.complement}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

PlaceCard.displayName = 'PlaceCard';

PlaceCard.propTypes = {
    place: PropTypes.shape({
        iamgePath: PropTypes.string,
        // TODO: validate if price returns as string
        price: PropTypes.string,
        estimatedCommute: PropTypes.string,
        address: PropTypes.shape({
            street: PropTypes.string,
            number: PropTypes.string,
            tag: PropTypes.string,
            vicinity: PropTypes.string,
            complement: PropTypes.string
        })
    }).isRequired
};

export default PlaceCard;
