import { useEffect, useState } from 'react';
import sunny from '../assets/sunny_background.jpg';
import partly_cloudy from '../assets/partly_cloudy_background.jpg';
import cloudy from '../assets/cloudy_background.jpg';
import overcast from '../assets/overcast_background.jpg';
import mist from '../assets/overcast_background.jpg';
import patchy_rain_nearby from '../assets/patchy_rain_nearby_background.jpg'
import patchy_snow_nearby from '../assets/patchy_rain_nearby_background.jpg'
import patchy_sleet_nearby from '../assets/patchy_sleet_nearby_background.jpg'
import patchy_freezing_drizzle_nearby from '../assets/patchy_freezing_drizzle_nearby_background.jpg'
import thundery_outbreaks_in_nearby from '../assets/thundery_outbreaks_in_nearby_background.jpg'
import blowing_snow from '../assets/blowing_snow_background.jpg'
import blizzard from '../assets/blizzard_background.jpg'
import clear from '../assets/clear_background.jpg'

export const useDynamicBackground = (conditionText) => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [highResImageLoaded, setHighResImageLoaded] = useState(false);

    useEffect(() => {
        const dynamicWeatherBackground = (condition) => {
            if (condition === 'Sunny') {
                return sunny
            } else if (condition === 'Partly cloudy') {
                return partly_cloudy
            } else if (condition === 'Cloudy') {
                return cloudy
            } else if (condition === 'Overcast') {
                return overcast
            } else if (condition === 'Mist') {
                return mist
            } else if (condition === '"Patchy rain nearby') {
                return patchy_rain_nearby
            } else if (condition === 'Patchy snow nearby') {
                return patchy_snow_nearby
            } else if (condition === 'Patchy sleet nearby') {
                return patchy_sleet_nearby
            } else if (condition === 'Patchy freezing drizzle nearby') {
                return patchy_freezing_drizzle_nearby
            } else if (condition === 'Thundery outbreaks in nearby') {
                return thundery_outbreaks_in_nearby
            } else if (condition === 'Blowing snow') {
                return blowing_snow
            } else if (condition === 'Blizzard') {
                return blizzard
            } else if (condition === 'Clear') {
                return clear
            }
        };

        const bgImage = dynamicWeatherBackground(conditionText);
        setBackgroundImage(bgImage);

        // Progressive image loading
        const highResImage = new Image();
        highResImage.src = bgImage;
        highResImage.onload = () => {
            setHighResImageLoaded(true);
        };

        return () => {
            highResImage.onload = null;
        };
    }, [conditionText]);

    return { backgroundImage, highResImageLoaded };
}
