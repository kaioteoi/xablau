import React, {useState, useEffect} from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {saveOrderRoom} from 'api/local-storage';

const AREAS = ['Fachada', 'Quarto', 'Sala de Estar', 'Banheiro', 'Cozinha'];

const style = {
    padding: '20px',
    borderStyle: 'solid',
    borderWidth: '1px',
    background: '#FFF',
    borderColor: '#bdbdbd',
    listStyleType: 'none'
};

const SortableItem = SortableElement(({value}) => <li style={style}>{value}</li>);
const SortableList = SortableContainer(({items}) => {
    return (
        <ul style={{listStyleType: 'none'}}>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value}/>
            ))}
        </ul>
    );
});

function PreferenceForm() {
    const [items, setItems] = useState(AREAS);

    useEffect(() => {
        saveOrderRoom(items);
        // eslint-disable-next-line
    }, []);

    const onSortEnd = ({oldIndex, newIndex}) => {
        const _items = arrayMove(items, oldIndex, newIndex);
        setItems(_items);
        saveOrderRoom(_items);
    };

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Arraste e ordene suas preferências:
                    </Typography>
                    <br/>
                    <SortableList items={items} onSortEnd={onSortEnd} style={style}/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default PreferenceForm;
