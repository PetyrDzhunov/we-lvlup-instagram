/* eslint-disable max-len */
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

function DownloadApplication(): JSX.Element {
    return (
        <Box component="section">
            <Typography
                variant="body2"
                paragraph
                align="center"
                sx={{ marginTop: '30px' }}
            >
                Изтеглете приложението
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    className="download-image"
                    alt="download from apple store"
                    src="https://w7.pngwing.com/pngs/440/692/png-transparent-app-store-apple-logo-apple-text-logo-microsoft-store.png"
                />
                <img
                    className="download-image"
                    alt="download from google play"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
                />
            </Box>
        </Box>
    )
}

export default DownloadApplication
