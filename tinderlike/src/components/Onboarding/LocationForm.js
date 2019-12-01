import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export class LocationForm extends Component {
	render() {
    const { values, handleChange } = this.props;
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom>
          De onde você quer estar perto?
				</Typography>
        <br />
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<TextField
							required
							id="location"
							name="location"
              variant="outlined"
              label="Endereço"
              onChange={handleChange("location")}
              defaultValue={values.location}
							fullWidth
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
              onChange={handleChange("distance")}
              defaultValue={values.distance}
							fullWidth
						/>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export default LocationForm;
