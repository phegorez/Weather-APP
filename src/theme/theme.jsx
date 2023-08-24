import { createTheme } from '@mui/material'

const theme = createTheme({
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(",")
    },
    TextField: {
        fontFamily: ["Poppins", "sans-serif"].join(",")
    },
    breakpoints: {
        values: {
            mobile: 375,
            tablet: 768,
            desktop: 1366,
        }
    }
});

export default theme