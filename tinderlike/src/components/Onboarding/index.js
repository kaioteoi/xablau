import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {makeStyles} from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import PersonalDetailsForm from './PersonalForm';
import PreferenceForm from './PreferenceForm';
import uuidv4 from 'uuid/v4';

import PATHS from 'components/constants';
import LocationForm from "./LocationForm";
import {saveIdentifier, getIdentifier} from 'api/local-storage';

const useStyles = makeStyles(theme => ({
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
}));

const steps = ["Localização", "Pessoal", "Preferências"];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <LocationForm/>;
        case 1:
            return <PersonalDetailsForm/>;	
        case 2:
            return <PreferenceForm/>;
        default:
            throw new Error("Unknown step");
	}
}

function Form() {
    const [activeStep, setActiveStep] = useState(0);
    const history = useHistory();

    const handleNext = () => {
        setActiveStep(activeStep+1);
    };

    const handleSearch = () => {
        history.push(PATHS.MATCHER)
    };

    const handleBack = () => {
        setActiveStep(activeStep-1);
    };

    useEffect(() => {
        if (!getIdentifier()) {
            saveIdentifier(uuidv4())
        }
        // eslint-disable-next-line
    }, []);

    const classes = useStyles();

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

                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <div className={classes.buttons}>
                            {activeStep !== 0 && (
                                <Button
                                    onClick={handleBack}
                                    variant="outlined"
                                    className={classes.button}>
                                    Voltar
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={activeStep === steps.length - 1 ? handleSearch : handleNext}
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

export default Form
