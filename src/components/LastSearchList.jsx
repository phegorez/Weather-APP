import React from 'react';
import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';

const LastSearchList = ({ searchHistory, handleLastSearchClick }) => {
    return (
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
    );
};

export default LastSearchList;
