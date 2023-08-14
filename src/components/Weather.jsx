import {
    Container,
    Stack,
    List,
    ListItemText,
    TextField,
    Box,
    ListItemButton,
    Autocomplete
} from '@mui/material'

import rainy_background from '../image/background/rainy_background.jpg'
import Typography from '@mui/material/Typography'
import './Weather.css'
import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { City } from 'country-state-city';

// Constants for API key and maximum search history
const API_KEY = '57b3e3ef5dac4f459e721726232305';
const MAX_SEARCH_HISTORY = 5;

// const initialState = {
//     isFetching: false,
//     latitude: '',
//     longitude: '',
//     searchTerm: '',
//     searchResults: [],
//     placeholder: '',
//     cityNameMap: {},
//     searchHistory: [],
//     lastSelected: '',
//     query: '',
//     data: null
// }

// const reducer = (state, action) => {
//     switch (action?.type) {
//         case 'FETCHING':
//             return { ...state, isFetching: true }
//         case 'FETCHED':
//             return { ...state, isFetching: false, data: action.payload }
//         case 'UPDATE_SEARCH_HISTORY':
//             return {
//                 ...state,
//                 searchHistory: [action.payload, ...state.searchHistory.slice(0, MAX_SEARCH_HISTORY - 1)]
//             }
//         case 'UPDATE_STATE':
//             return { ...state, ...action.payload }
//         default:
//             return state
//     }
// }

const Weather = () => {
    // const [state, dispatch] = useReducer(reducer, initialState)
    // State variables for various data and user interactions
    const [isFetching, setIsFetching] = useState(false)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [placeholder, setPlaceholder] = useState('');
    const [cityNameMap, setCityNameMap] = useState({});
    const [searchHistory, setSearchHistory] = useState([]);
    const [lastSelected, setLastSelected] = useState('');
    const [query, setQuery] = useState('')
    const [data, setData] = useState(null)


    //Fetch and preprocess city data for search functionalty
    useEffect(() => {
        // Pre-process city data into a hash map for O(1) lookups

        // Array data
        const cities = City.getAllCities();
        const map = {};
        cities.forEach((city) => {
            map[city.name.toLowerCase()] = city.name;
        });
        setCityNameMap(map);
    }, []);

    //Fetch weather data based on location or search query
    const fetchWeatherByLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // dispatch({type: ' ', payload: {latitude, longitude}})
                    setLatitude(latitude);
                    setLongitude(longitude);

                    //Using latitude and longitude from current locaction 
                    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`;
                    fetchWeatherData(apiUrl);
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        } else {
            console.log('Geolocation is not available in this browser');
        }
    };

    //Fetch weather data based on search query
    useEffect(() => {
        if (!isFetching) {
            fetchWeatherByLocation();
        } else if (isFetching) {
            //Using query by user interact, Search Input & Last Search
            const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`;
            fetchWeatherData(apiUrl);
        }
    }, [query, isFetching, latitude, longitude]);

    //Fetch weather data from API and update state
    const fetchWeatherData = (apiUrl) => {
        axios.get(apiUrl)
            .then((res) => {
                // dispatch({type: 'FETCHED', payload: res.data})
                setData(res.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    //Handle user search input and display matching city suggestions
    const handleSearch = (query) => {
        setSearchTerm(query);

        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            const matchingCities = Object.keys(cityNameMap).filter(cityName =>
                cityName.startsWith(lowerCaseQuery)
            );

            // // Generate city name suggestions
            const suggestions = matchingCities
                .slice(0, MAX_SEARCH_HISTORY)
                .map(cityName => cityNameMap[cityName]);

            setSearchResults(suggestions);
            if (suggestions.length > 0) {
                setPlaceholder(suggestions[0]);
            }

        } else {
            setSearchResults([]);
            setPlaceholder('');
        }
    };

    //Handle Autocomplete component change
    const handleAutocompleteChange = (event, value) => {
        if (value) {
            setLastSelected(value);
            addToSearchHistory(value);
            setIsFetching(true)
        }
    };

    //Add a new search query to search history with a maximum limit
    const addToSearchHistory = (value) => {
        if (!searchHistory.includes(value)) {
            setSearchHistory(prevHistory => [value, ...prevHistory.slice(0, MAX_SEARCH_HISTORY - 1)]);
        }
    };

    //Handle click on a previous search item
    const handleLastSearchClick = (primaryValue) => {
        setQuery(primaryValue);
        setSearchTerm(primaryValue)
        setIsFetching(true)
    };

    //Render the Weather component
    return (
        <Container className='container'
            style={{
                backgroundImage: `url(${rainy_background})`,
                display: 'flex',
                justifyContent: 'space-between',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                padding: '0',
                margin: '0',
                maxWidth: '100%',
                height: '100vh'
            }}>

            {/* left side */}
            <section className='left'>

                {/* Logo */}
                <Typography variant="h6" color="white" sx={{ padding: '30px 0 0 80px' }}>
                    the.weather
                </Typography>

                {/* Display area */}
                <Stack className="display-details"
                    sx={{ margin: '65vh 0 0 80px' }}
                    direction='row'
                    alignItems='center'
                >

                    {/* temperature */}
                    <Box className="temperature" style={{ padding: '0 30px 0 0' }}>
                        {data && data.current && (
                            <Typography variant="h1" color="white">
                                {Math.floor(data.current.temp_c)}°C
                            </Typography>
                        ) || (
                                <Typography variant="h1" color="white">
                                    Loading...
                                </Typography>
                            )}
                    </Box>

                    {/* location-details */}
                    <Box className="location-details" style={{ padding: '0 30px 0 0' }}>

                        {data && data.location && (
                            <Typography variant="h4" color="white">
                                {data.location.name}
                            </Typography>
                        )}


                        {/*Times-Details*/}
                        <Stack className="times"
                            direction='row'
                            alignItems='center'
                        >
                            {data && data.location && (
                                <Typography variant="body1" color="white" className='date-time' sx={{ fontSize: '13px' }}>
                                    {data.location.localtime}
                                </Typography>
                            )}

                        </Stack>

                    </Box>

                    {/* weather icon */}
                    <Stack className="weather-icon"
                        alignItems='center'
                        sx={{ margin: '10px 0 0 0' }}
                    >
                        {data && data.current && data.current.condition && (
                            <img src={data.current.condition.icon} alt="" />
                        )}
                        {data && data.current && data.current.condition && (
                            <Typography variant="body2" color="white">
                                {data?.current.condition.text}
                            </Typography>
                        )}

                    </Stack>

                </Stack>

            </section>

            {/* right side */}
            <section className='right'>
                {/* Search area */}
                <Stack
                    direction='row'
                    alignItems='center'
                    sx={{ margin: '20px 20px 0 20px' }}
                >

                    {/* Input */}

                    <Autocomplete
                        disablePortal
                        options={searchResults}
                        value={lastSelected}
                        sx={{
                            width: 300,
                            '& .MuiOutlinedInput-root': {
                                width: '100%', // Make sure the input field spans the entire width
                                '& fieldset': {
                                    border: '2px solid #071013', // Set the fieldset border size and color
                                    transition: 'border-color 0.3s'
                                },
                                '&:hover fieldset': {
                                    borderColor: '#DFE0E2'
                                },
                                '&:focus-within fieldset': {
                                    borderColor: '#90DDF0', // Change border color on focus
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#DFE0E2', // Change the label color here
                            },
                        }}
                        renderInput={(result) =>
                            <TextField
                                sx={{ input: { color: 'white' }, }}
                                {...result}
                                label='Search City'
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder={placeholder || 'Search for a city'}
                            />}
                        onChange={handleAutocompleteChange}
                        onInputChange={(event, newValue) => {
                            if (event && (event.type === 'click' || event.type === 'keydown')) {
                                setQuery(newValue);
                            }
                        }}
                        onKeyDown={(e, newValue) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                setQuery(newValue)
                                setIsFetching(true)
                            }
                        }}
                    />

                </Stack>

                {/* Last search list */}
                <Box sx={{ padding: '30px 67px 30px 0', borderBottom: '1px solid #d3d3d3', margin: '0 20px 0 20px' }}>
                    <Typography variant="body1" color="white">Last Search :</Typography>
                    <List component="nav" aria-label="secondary mailbox folder">
                        {searchHistory.map((lastSearch, index) => (
                            <ListItemButton
                                key={index}
                                onClick={() => handleLastSearchClick(lastSearch)}
                            >
                                <ListItemText
                                    disableTypography
                                    primary={<Typography variant="body1" color="white">{lastSearch}</Typography>}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>

                {/* Weather Details box */}
                <Box
                    sx={{
                        margin: '40px 20px 0 20px',
                        paddingBottom: '40px',
                        borderBottom: '1px #d3d3d3 solid'
                    }}
                >
                    <Typography variant="body1" color="white">
                        Weather Details
                    </Typography>

                    {/* Details */}
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        sx={{
                            margin: '50px 20px 0 20px'
                        }}
                    >
                        {/* Details List */}
                        <Stack
                            spacing={2}
                        >
                            <Typography variant="body1" color="#d3d3d3">
                                Cloudy
                            </Typography>
                            <Typography variant="body1" color="#d3d3d3">
                                Humidity
                            </Typography>
                            <Typography variant="body1" color="#d3d3d3">
                                Wind
                            </Typography>
                            <Typography variant="body1" color="#d3d3d3">
                                Uv index
                            </Typography>
                        </Stack>

                        {/* Details Value */}
                        <Stack
                            spacing={2}
                        >
                            <Typography variant="body1" color="white">
                                {data?.current?.cloud || 'Loading'}
                            </Typography>
                            <Typography variant="body1" color="white">
                                {data?.current?.humidity || 'Loading'} %
                            </Typography>
                            <Typography variant="body1" color="white">
                                {data?.current?.wind_kph || 'Loading'} Km/h
                            </Typography>
                            <Typography variant="body1" color="white">
                                {data?.current?.uv || 'Loading'}
                            </Typography>
                        </Stack>
                    </Stack>

                </Box>

            </section>

        </Container>
    )

}
export default Weather