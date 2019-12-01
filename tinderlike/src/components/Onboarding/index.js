
import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import LocationForm from "./LocationForm";
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
		marginLeft: theme.spacing(1) * 2,
		marginRight: theme.spacing(1) * 2,
		[theme.breakpoints.up(600 + theme.spacing(1) * 2 * 2)]: {
			width: 600,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing(1) * 3,
		marginBottom: theme.spacing(1) * 3,
		padding: theme.spacing(1) * 2,
		[theme.breakpoints.up(600 + theme.spacing(1) * 3 * 2)]: {
			marginTop: theme.spacing(1) * 6,
			marginBottom: theme.spacing(1) * 6,
			padding: theme.spacing(1) * 3
		}
	},
	stepper: {
		padding: `${theme.spacing(1) * 3}px 0 ${theme.spacing(1) * 5}px`
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing(1) * 3,
		marginLeft: theme.spacing(1)
	}
});

const steps = ["Localização", "Pessoal", "Preferências"];

function getStepContent(step, values, handleChange) {
	switch (step) {
		case 0:
      return <LocationForm values={values} handleChange={handleChange} />
			// return <AccountForm values={values} handleChange={handleChange} />;
		case 1:
			// return <SocialForm values={values} handleChange={handleChange} />;
      return <p>Form</p>;
		case 2:
			// return <PersonalDetailsForm values={values} handleChange={handleChange} />;
      return <p>Form</p>;
		default:
			throw new Error("Unknown step");
	}
}

class Form extends React.Component {
	state = {
		activeStep: 0,
    data: null,
		location: "",
		distance: ""
	};

	handleNext = () => {
		this.setState(state => ({
			activeStep: state.activeStep + 1
		}));
	};

	handleSearch = () => {
    const { location, distance } = this.state;

    window.localStorage.setItem('onboarding', JSON.stringify({ location, distance }));

    this.setState({ done: true });
	};

	handleBack = () => {
		this.setState(state => ({
			activeStep: state.activeStep - 1
		}));
	};

	handleChange = input => e => {
		this.setState({ [input]: e.target.value });
	};

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('onboarding'))

    if (data) {
      this.setState({ done: true })
    }
  }

	render() {
		const { classes } = this.props;
		const { done, activeStep } = this.state;
		const { location, distance } = this.state;
		const values = { location, distance };

		return (
			<React.Fragment>
        {done && (
          <Redirect to="/matcher" />
        )}
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
                  onClick={activeStep === steps.length - 1 ? this.handleSearch: this.handleNext}
                  className={classes.button}>
                  {activeStep === steps.length - 1 ? "Buscar" : "Avançar"}
                </Button>
              </div>
            </React.Fragment>
					</Paper>
				</main>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Form);

