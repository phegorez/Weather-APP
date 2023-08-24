import { Stack, Box, Typography } from "@mui/material"

const WeatherDetailsBox = ({data}) => {
    return (
        <Box
            sx={{
                margin: {
                    mobile :'10px 0px 0 15px',
                    tablet: '40px 20px 0 20px'
                },
                paddingBottom: {
                    mobile : '0',
                    tablet: '40px'
                },
                borderBottom: {
                    mobile : 'none',
                    tablet : '1px #d3d3d3 solid'
                }
            }}
        >
            <Typography 
                variant="body1" 
                color="white" 
                sx={{
                    display:{
                        mobile:'none',
                        tablet:'block'
                    }
                }}>
                Weather Details
            </Typography>

            {/* Details */}
            <Stack
                direction='row'
                justifyContent='space-between'
                sx={{
                    margin: {
                        mobile : '30px 5px 0 5px',
                        tablet : '50px 20px 0 20px'
                    }
                }}
            >
                {/* Details List */}
                <Stack
                    spacing={2}
                    sx={{
                        marginRight: {
                            mobile : '15px',
                            tablet : '0'
                        },
                    }}
                >
                    <Typography variant="body1" color="#d3d3d3" 
                    sx={{
                        fontSize: {
                            mobile: '0.875rem',
                            tablet:'1rem'
                        }
                    }}>
                        Cloudy :
                    </Typography>
                    <Typography variant="body1" color="#d3d3d3"
                    sx={{
                        fontSize: {
                            mobile: '0.875rem',
                            tablet:'1rem'
                        }
                    }}
                    >
                        Humidity :
                    </Typography>
                    <Typography variant="body1" color="#d3d3d3"
                    sx={{
                        fontSize: {
                            mobile: '0.875rem',
                            tablet:'1rem'
                        }
                    }}
                    >
                        Wind :
                    </Typography>
                    <Typography variant="body1" color="#d3d3d3"
                    sx={{
                        fontSize: {
                            mobile: '0.875rem',
                            tablet:'1rem'
                        }
                    }}
                    >
                        Uv index :
                    </Typography>
                </Stack>

                {/* Details Value */}
                <Stack
                    spacing={1.5}
                    sx={{
                    }}
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
    )
}

export default WeatherDetailsBox