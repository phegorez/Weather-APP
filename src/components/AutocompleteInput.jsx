import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteInput = ({ searchTerm, placeholder, searchResults, handleSearch, handleAutocompleteChange, handleInputChange, handleKeyDown, setQuery, setIsFetching }) => {
    return (
        <Autocomplete
            disablePortal
            options={searchResults}
            value={searchTerm}
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
                handleInputChange(event, newValue)
            }}
            onKeyDown={(e, newValue) => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    setQuery(newValue)
                    setIsFetching(true)
                    handleKeyDown(e, newValue)
                }
            }}
        />
    );
};

export default AutocompleteInput;
