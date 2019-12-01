import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import { saveKids, saveRoom, saveTransport } from 'api/local-storage';

class PersonalForm extends Component {
    
    state = {
        kids: 0,
        room: 1,
        transport: 1
    }

    componentDidMount() {
        saveKids(0);
        saveRoom(1);
        saveTransport(1);
    }

    render() {
        const {kids, room, transport} = this.state;

        return (
            <React.Fragment>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Você possui filhos?
                        </Typography>
                        <br />
                        <Select 
                         labelId={"Filhos"} id={"select"} value={kids}
                         onChange={e => {
                            this.setState({kids: e.target.value});
                            saveKids(e.target.value);
                         }} 
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
                         labelId={"living"} id={"select-room"} value={room}
                         onChange={e => {
                             this.setState({room: e.target.value});
                             saveRoom(e.target.value);
                         }} 
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
        )
    }
}

export default PersonalForm;
