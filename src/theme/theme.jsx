import { createTheme} from '@mui/material'

const theme = createTheme({
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(",")
    },
    TextField: {
        fontFamily: ["Poppins", "sans-serif"].join(",")
    },
    ListItemText: {
        primary:{
            main : 'white'
        }
    }
});

export default theme