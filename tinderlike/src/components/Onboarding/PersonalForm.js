import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import { saveKids, saveRoom, saveTransport } from 'app/api/local-storage';

class PersonalForm extends Component {
    render() {
        const { values, handleChange } = this.props;

        return (
            <React.Fragment>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Você possui filhos?
                        </Typography>
                        <br />
                        <Select 
                         labelId={"Filhos"} id={"select"} value={0}
                         onChange={e => saveKids(e.target.value)} 
                        >
                            <MenuItem value={'1'}>Sim</MenuItem>
                            <MenuItem value={'0'}>Não</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Quantas pessoas irão morar com você?
                        </Typography>
                        <br />
                        <Select 
                         labelId={"living"} id={"select-room"} value={1}
                         onChange={e => saveRoom(e.target.value)} 
                        >
                            <MenuItem value={'1'}>1</MenuItem>
                            <MenuItem value={'2'}>2</MenuItem>
                            <MenuItem value={'3'}>3</MenuItem>
                            <MenuItem value={'4'}>4+</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Qual seu principal meio de transporte?
                        </Typography>
                        <br />
                        <Select 
                         labelId={"select-car"} id={"select-car"} value={1}
                         onChange={e => saveTransport(e.target.value)} >
                            <MenuItem value={'1'}>Automóvel Próprio</MenuItem>
                            <MenuItem value={'2'}>Transporte Público</MenuItem>
                            <MenuItem value={'3'}>A pé</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default PersonalForm;
