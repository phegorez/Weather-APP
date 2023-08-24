import { Box, Container, Typography } from "@mui/material";

const Display = ({ data }) => {
    return (
        <Container
            className="display-details"
            sx={{
                margin: {
                    mobile: '25vh 0 0 auto',
                    tablet: '65vh 0 0 80px'
                },
                display: {
                    mobile: 'block',
                    tablet: 'flex'
                },
                flexDirection: 'row',
                alignItems: 'center',

            }}
        >
            {/* temperature */}
            <Box
                className="temperature"
                sx={{
                    padding: {
                        mobile: '0 10px 0 0',
                        tablet: '0 30px 0 0'
                    },
                }}
            >
                {data && data.current ? (
                    <Typography
                        variant="h1"
                        color="white"
                        sx={{
                            fontSize: {
                                mobile: '2rem',
                                tablet: '6rem'
                            },
                        }}
                    >
                        {Math.floor(data.current.temp_c)}°C
                    </Typography>
                ) : (
                    <Typography
                        variant="h1"
                        color="white"
                        sx={{
                            fontSize: {
                                mobile: '2rem',
                                tablet: '6rem'
                            },
                        }}
                    >
                        Loading...
                    </Typography>
                )}
            </Box>

            {/* location-details */}
            <Box
                className="location-details"
                sx={{
                    padding: '0 30px 0 0',
                }}
            >
                {/* Location Name */}
                {data && data.location && (
                    <Typography
                        variant="h4"
                        color="white"
                        sx={{
                            fontSize: '2rem',
                        }}
                    >
                        {data.location.name}
                    </Typography>
                )}

                {/* Times-Details */}
                {data && data.location && (
                    <Typography
                        variant="body1"
                        color="white"
                        className='date-time'
                        sx={{ fontSize: '13px' }}
                    >
                        {data.location.localtime}
                    </Typography>
                )}
            </Box>

            {/* weather icon */}
            <Box
                className="weather-icon"
                sx={{
                    margin: '10px 0 0 0',
                }}
            >
                {data && data.current && data.current.condition && (
                    <img src={data.current.condition.icon} alt="" />
                )}
                {data && data.current && data.current.condition && (
                    <Typography variant="body2" color="white">
                        {data?.current.condition.text}
                    </Typography>
                )}
            </Box>
        </Container>
    );
}

export default Display;
