import Typography from '@mui/material/Typography'

const Logo = () => {
    return (
        <Typography 
            variant="h6" 
            color="white" 
            sx={{ 
                padding: {
                    mobile: '30px 0 0 15px',
                    tablet: '30px 0 0 80px'
                } 
            }}>
            the.weather
        </Typography>
    )

}

export default Logo