import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
    getLocation,
    getDistance,
    saveLocation,
    saveDistance,
    saveTransport
} from 'api/local-storage';
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";

function LocationForm() {
    const [transport, setTransport] = useState(1);

    const handleOnChangeLocation = e => {
        saveLocation(e.target.value);
    };

    const handleChangeDistance = e => {
        saveDistance(e.target.value);
    };

    useEffect(() => {
        saveTransport(1);
        // eslint-ignore-next-line
    }, []);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                {'De onde você quer estar perto?'}
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
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Qual seu principal meio de transporte?
                    </Typography>
                    <br/>
                    <Select
                        labelId={"select-car"} id={"select-car"} value={transport}
                        onChange={e => {
                            setTransport(e.target.value);
                            saveTransport(e.target.value);
                        }}>
                        <MenuItem value={'1'}>Automóvel Próprio</MenuItem>
                        <MenuItem value={'2'}>Transporte Público</MenuItem>
                        <MenuItem value={'3'}>A pé</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default LocationForm;
