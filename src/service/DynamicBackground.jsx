import { useEffect, useState } from 'react';
import sunny_background from '../assets/sunny_background.jpg';
import partly_cloudy_background from '../assets/partly_cloudy_background.jpg';
import cloudy_background from '../assets/cloudy_background.jpg';
import overcast_background from '../assets/overcast_background.jpg';

export const useDynamicBackground = (conditionText) => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [highResImageLoaded, setHighResImageLoaded] = useState(false);
    
    useEffect(() => {
        const dynamicWeatherBackground = (condition) => {
            if (condition === 'Sunny') {
                return sunny_background;
            } else if (condition === 'Partly cloudy') {
                return partly_cloudy_background;
            } else if (condition === 'Cloudy') {
                return cloudy_background;
            } else if (condition === 'Overcast') {
                return overcast_background;
            } else {
                return ''; // Default background
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
