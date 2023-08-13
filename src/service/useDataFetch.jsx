import { useState, useEffect } from 'react';
import axios from 'axios';

const useWeatherData = (defaultLocation) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeatherData = (location) => {
        setLoading(true);

        // Define the API Key
        const apiKey = '57b3e3ef5dac4f459e721726232305';

        // Set the default location to 'Bangkok' if location is not provided
        const queryLocation = location || defaultLocation;

        // Define the API Url
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${queryLocation}&aqi=yes`;

        // Make the GET Request using Axios
        axios
            .get(apiUrl)
            .then((res) => {
                // Handle the successful response
                console.log('Fetched data:', res.data);
                setData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                // Handle any errors
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        // Fetch weather data when the component mounts
        fetchWeatherData(defaultLocation);
    }, [defaultLocation]);

    return { data, loading, error, fetchWeatherData };
};

export default useWeatherData;