
import React from "react";
import LocationForm from "./LocationForm";
// import AccountForm from "./AccountForm";
// import SocialForm from "./SocialForm";
// import PersonalDetailsForm from "./PersonalDetailsForm";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

const styles = theme => ({
	appBar: {
		position: "relative"
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		[theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
			width: 600,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,
		padding: theme.spacing.unit * 2,
		[theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
			marginTop: theme.spacing.unit * 6,
			marginBottom: theme.spacing.unit * 6,
			padding: theme.spacing.unit * 3
		}
	},
	stepper: {
		padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing.unit * 3,
		marginLeft: theme.spacing.unit
	}
});

const steps = ["Localização", "Social", "Personal"];

function getStepContent(step, values, handleChange) {
	switch (step) {
		case 0:
      return <LocationForm values={values} handleChange={handleChange} />
			// return <AccountForm values={values} handleChange={handleChange} />;
		case 1:
			// return <SocialForm values={values} handleChange={handleChange} />;
      return <p>Hello 2</p>;
		case 2:
			// return <PersonalDetailsForm values={values} handleChange={handleChange} />;
      return <p>Hello 3</p>;
		default:
			throw new Error("Unknown step");
	}
}

class Form extends React.Component {
	state = {
		activeStep: 0,
		location: "",
		distance: "",
		facebook: "",
		twitter: "",
		linkedIn: "",
		firstName: "",
		lastName: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		zip: "",
		country: ""
	};

	handleNext = () => {
		this.setState(state => ({
			activeStep: state.activeStep + 1
		}));
	};

	handleBack = () => {
		this.setState(state => ({
			activeStep: state.activeStep - 1
		}));
	};

	handleChange = input => e => {
		this.setState({ [input]: e.target.value });
	};

	render() {
		const { classes } = this.props;
		const { activeStep } = this.state;
		const { location, distance, facebook, twitter, linkedIn, firstName, lastName, address1, address2, city, state, zip, country } = this.state;
		const values = { location, distance, facebook, twitter, linkedIn, firstName, lastName, address1, address2, city, state, zip, country };

		return (
			<React.Fragment>
				<AppBar position="absolute" color="default" className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" color="inherit">
              Onboarding
						</Typography>
					</Toolbar>
				</AppBar>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography component="h1" variant="h4" align="center">
							Vamos achar o apê dos sonhos?
						</Typography>
						<Stepper activeStep={activeStep} className={classes.stepper}>
							{steps.map(label => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>

						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									Welcome!
								</Typography>
								<Typography variant="subtitle1">
									Thank you for taking the time to register. We hope you enjoy our community!
								</Typography>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(activeStep, values, this.handleChange)}
								<div className={classes.buttons}>
									{activeStep !== 0 && (
										<Button
											onClick={this.handleBack}
											variant="outlined"
											className={classes.button}>
											Voltar
										</Button>
									)}
									<Button
										variant="contained"
										color="secondary"
										onClick={this.handleNext}
										className={classes.button}>
										{activeStep === steps.length - 1 ? "Buscar" : "Avançar"}
									</Button>
								</div>
							</React.Fragment>
						)}
					</Paper>
				</main>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Form);

