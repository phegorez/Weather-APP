import { Stack, Box, Typography } from "@mui/material"

const WeatherDetailsBox = ({data}) => {
    return (
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
    )
}

export default WeatherDetailsBox