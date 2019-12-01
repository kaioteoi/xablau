import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { saveOrderRoom } from 'app/api/local-storage';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);
const SortableList = SortableContainer(({items}) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </ul>
    );
  });  

class PreferenceForm extends Component {
    state = {items: ['Fachada', 'Quarto', 'Sala de Estar', 'Banheiro', 'Cozinha']};

    componentDidMount() {
        saveOrderRoom(['Fachada', 'Quarto', 'Sala de Estar', 'Banheiro', 'Cozinha']);
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }), () => {
            const { items } = this.state;
            saveOrderRoom(items);
        });
    }

    render() {
        return(
            <React.Fragment>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Escolha suas preferências:
                        </Typography>
                        <br />
                        <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default PreferenceForm;
