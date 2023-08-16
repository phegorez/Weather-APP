import { Stack, Box, Typography } from "@mui/material"

const Display = ({data}) => {
    return (
    <Stack className="display-details"
        sx={{ margin: '65vh 0 0 80px' }}
        direction='row'
        alignItems='center'
    >

        {/* temperature */}
        <Box className="temperature" style={{ padding: '0 30px 0 0' }}>
            {data && data.current && (
                <Typography variant="h1" color="white">
                    {Math.floor(data.current.temp_c)}°C
                </Typography>
            ) || (
                    <Typography variant="h1" color="white">
                        Loading...
                    </Typography>
                )}
        </Box>

        {/* location-details */}
        <Box className="location-details" style={{ padding: '0 30px 0 0' }}>

            {data && data.location && (
                <Typography variant="h4" color="white">
                    {data.location.name}
                </Typography>
            )}


            {/*Times-Details*/}
            <Stack className="times"
                direction='row'
                alignItems='center'
            >
                {data && data.location && (
                    <Typography variant="body1" color="white" className='date-time' sx={{ fontSize: '13px' }}>
                        {data.location.localtime}
                    </Typography>
                )}

            </Stack>

        </Box>

        {/* weather icon */}
        <Stack className="weather-icon"
            alignItems='center'
            sx={{ margin: '10px 0 0 0' }}
        >
            {data && data.current && data.current.condition && (
                <img src={data.current.condition.icon} alt="" />
            )}
            {data && data.current && data.current.condition && (
                <Typography variant="body2" color="white">
                    {data?.current.condition.text}
                </Typography>
            )}

        </Stack>

    </Stack>
    )
}

export default Display