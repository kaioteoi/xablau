import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import {saveKids, saveRoom} from 'api/local-storage';

function PersonalForm() {
    const [kids, setKids] = useState(0);
    const [room, setRoom] = useState(1);

    useEffect(() => {
        saveKids(0);
        saveRoom(1);
        // eslint-ignore-next-line
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Você possui pets?
                    </Typography>
                    <br/>
                    <Select
                        labelId={"Filhos"} id={"select"} value={kids}
                        onChange={e => {
                            setKids(e.target.value);
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
                    <br/>
                    <Select
                        labelId={"living"} id={"select-room"} value={room}
                        onChange={e => {
                            setRoom(e.target.value);
                            saveRoom(e.target.value);
                        }}
                    >
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4+</MenuItem>
                    </Select>
                </Grid>

            </Grid>
        </React.Fragment>
    )
}

export default PersonalForm;
