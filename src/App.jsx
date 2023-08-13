import './App.css'
import { ThemeProvider, createTheme} from '@mui/material'
import Weather from './components/Weather';
import theme from './theme/theme';



function App() {


  return (
    <ThemeProvider theme={theme}>
      <Weather />
    </ThemeProvider>

  )
}

export default App
