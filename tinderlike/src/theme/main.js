import { createMuiTheme } from '@material-ui/core/styles';

import colors from './colors';

const theme = createMuiTheme({
    palette: {
        primary: colors.orange
    },
    typography: {
        subtitle1: {
            backgroundColor: colors.orange
        }
    }
});

export default theme;