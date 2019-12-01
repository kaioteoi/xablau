import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

function Reactions({ handleFavoriteOnClick, handleDislikeOnClick }) {
    return (
        <Grid container direction="row" justify="center" spacing={3}>
            <Grid item>
                <Fab aria-label="dislike" onClick={handleDislikeOnClick}>
                    <ThumbDownIcon/>
                </Fab>
            </Grid>
            <Grid item>
                <Fab color="primary" aria-label="favorite" onClick={handleFavoriteOnClick}>
                    <FavoriteIcon/>
                </Fab>
            </Grid>
        </Grid>
    );
}

Reactions.propTypes = {
    handleFavoriteOnClick: PropTypes.func.isRequired,
    handleDislikeOnClick: PropTypes.func.isRequired
};

export default Reactions;
