import {
    Stack,
    Box, Typography,
} from '@mui/material'

import './Weather.css'
import AutocompleteInput from '../components/AutocompleteInput';
import LastSearchList from '../components/LastSearchList';
import { useWeatherService } from '../service/WeatherService';
import Logo from '../components/Logo';
import Display from '../components/Display';
import WeatherDetailsBox from '../components/WeatherDetailsBox';
import { useDynamicBackground } from '../service/DynamicBackground'

const MAX_SEARCH_HISTORY = 5;

const Weather = () => {

    //Function Area
    const {
        isFetching,
        latitude,
        longitude,
        searchTerm,
        searchResults,
        placeholder,
        cityNameMap,
        searchHistory,
        lastSelected,
        conditionText,
        query,
        data,
        fetchWeatherByLocation,
        fetchWeatherData,
        setLatitude,
        setLongitude,
        setSearchTerm,
        setQuery,
        setIsFetching,
        setSearchResults,
        setPlaceholder,
        setSearchHistory,
        setLastSelected,
        setConditionText
        // Other functions if needed
    } = useWeatherService(); // Use the useWeatherService hook

    //Use the DynamicBackground hook
    const {backgroundImage} = useDynamicBackground(data?.current.condition.text)

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

    //Handle Input Change
    const handleInputChange = (event, newValue) => {
        // Handle input change logic here
    };

    //Handle Key Down
    const handleKeyDown = (event, newValue) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setQuery(newValue);
            setIsFetching(true);
            // Handle key down logic here
        }
    };

    //Render the Weather component
    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                maxWidth: '100%',
                height:'100%',
                maxHeight:'100vh',
                overflow:'hidden',
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-around'
            }}
        >

            {/* left side */}
            <Box
                className='left'
                sx={{
                    width:{
                        mobile:'50%',
                        tablet:'50%'
                    },
                    height:'100vh',
                    maxHeight:'100%',
                }}
            >

                {/* Logo */}
                <Logo />

                {/* Display area */}
                <Display
                    data={data}
                />

            </Box>

            <Box sx={{
                width:{
                    mobile:"0%",
                    tablet:'100%'
                },
            }} />

            {/* right side */}
            <Box 
                className='right'
                sx={{
                    marginTop: {
                        mobile: '25vh',
                        tablet: '0'
                    },
                    width:{
                        mobile:'50%',
                        tablet:'50%'
                    },
                    height: {
                        mobile:'45vh',
                        tablet:'100vh'
                    },
                    maxHeight:'100%',
                }}
            >
                {/* Search area */}
                <Stack
                    direction='row'
                    alignItems='center'
                    sx={{ margin: '20px 20px 0 20px' }}
                >

                    {/* Input */}

                    <AutocompleteInput
                        searchTerm={searchTerm}
                        placeholder={placeholder}
                        searchResults={searchResults}
                        handleSearch={handleSearch}
                        handleAutocompleteChange={handleAutocompleteChange}
                        handleInputChange={handleInputChange}
                        handleKeyDown={handleKeyDown}
                        setQuery={setQuery}
                        setIsFetching={setIsFetching}
                    />


                </Stack>

                {/* Last search list */}
                <LastSearchList
                    searchHistory={searchHistory}
                    handleLastSearchClick={handleLastSearchClick}
                />

                {/* Weather Details box */}
                <WeatherDetailsBox
                    data={data}
                />

            </Box>

        </Box>
    )

}
export default Weather