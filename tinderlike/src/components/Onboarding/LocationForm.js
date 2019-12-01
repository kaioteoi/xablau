import React from "react";
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

class LocationForm extends React.Component {
  state = {
    transport: 1
  };

  handleOnChangeLocation = e => {
      saveLocation(e.target.value);
  };

  handleChangeDistance = e => {
      saveDistance(e.target.value);
  };

  componentDidMount() {
    saveTransport(1);
  }

  render() {
    const {transport} = this.state;
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
                        onChange={this.handleOnChangeLocation}
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
                        onChange={this.handleChangeDistance}
                        defaultValue={getDistance()}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Qual seu principal meio de transporte?
                    </Typography>
                    <br />
                    <Select
                     labelId={"select-car"} id={"select-car"} value={transport}
                     onChange={e => {
                        this.setState({transport: e.target.value});
                        saveTransport(e.target.value);
                     }} >
                        <MenuItem value={'1'}>Automóvel Próprio</MenuItem>
                        <MenuItem value={'2'}>Transporte Público</MenuItem>
                        <MenuItem value={'3'}>A pé</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        </React.Fragment>
    );
  }
}

export default LocationForm;
