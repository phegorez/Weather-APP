import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { City } from 'country-state-city';

const API_KEY = '57b3e3ef5dac4f459e721726232305';
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';

export const useWeatherService = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [placeholder, setPlaceholder] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [lastSelected, setLastSelected] = useState('');
    const [query, setQuery] = useState('');
    const [data, setData] = useState(null);


    const cityNameMap = useMemo(() => {
        const cities = City.getAllCities();
        const map = {};
        cities.forEach((city) => {
            map[city.name.toLowerCase()] = city.name;
        });
        return map;
    }, []);

    const fetchWeatherByLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // dispatch({type: ' ', payload: {latitude, longitude}})
                    setLatitude(latitude);
                    setLongitude(longitude);
                    console.log('Latitude:', latitude)
                    console.log('Longitude:', longitude)

                    //Using latitude and longitude from current locaction 
                    const apiUrl = `${WEATHER_API_URL}?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`;
                    fetchWeatherData(apiUrl);
                },
                (error) => {
                    console.error('Error getting current location:', error);
                },
                { enableHighAccuracy: true }
            );
        } else {
            console.log('Geolocation is not available in this browser');
        }
    };

    useEffect(() => {
        if (!isFetching) {
            fetchWeatherByLocation();
        } else if (query) {
            //Using query by user interact, Search Input & Last Search
            const apiUrl = `${WEATHER_API_URL}?key=${API_KEY}&q=${query}&aqi=no`;
            fetchWeatherData(apiUrl);
        }
    }, [query, isFetching, latitude, longitude]);

    //Fetch weather data from API and update state
    const fetchWeatherData = async (apiUrl) => {
        console.log('Fetching weather data from:', apiUrl);
        try {
            const response = await axios.get(apiUrl)
            setData(response.data)
        } catch (error) {
            console.error('Error:', error)
        }
    };

    // Other functions if needed

    return {
        isFetching,
        latitude,
        longitude,
        searchTerm,
        searchResults,
        placeholder,
        cityNameMap,
        searchHistory,
        lastSelected,
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
        // Other functions if needed
    };
};
