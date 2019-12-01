import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import {  getLocation, getDistance, saveLocation, saveDistance } from 'api/local-storage';

function LocationForm() {
    const handleOnChangeLocation = e => {
        saveLocation(e.target.value);
    };

    const handleChangeDistance = e => {
        saveDistance(e.target.value);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                De onde você quer estar perto?
            </Typography>
            <br/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="location"
                        name="location"
                        variant="outlined"
                        label="Endereço"
                        onChange={handleOnChangeLocation}
                        fullWidth
                        defaultValue={getLocation()}
                        autoComplete="location"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        variant="outlined"
                        type="number"
                        id="distance"
                        name="distance"
                        label="O quão longe (em minutos)?"
                        onChange={handleChangeDistance}
                        defaultValue={getDistance()}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default LocationForm;
