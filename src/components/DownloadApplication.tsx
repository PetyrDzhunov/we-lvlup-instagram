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
                    marginLeft: '5px',
                }}
            >
                <a
                    className="download-link"
                    href="https://apps.apple.com/app/instagram/id389801252?vt=lo"
                >
                    <img
                        className="download-image app"
                        alt="download from apple store"
                        src="https://w7.pngwing.com/pngs/440/692/png-transparent-app-store-apple-logo-apple-text-logo-microsoft-store.png"
                    />
                </a>

                <a
                    className="download-link"
                    href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=B1E45CC8-DA2A-439F-A44F-D331823CCDCF&utm_content=lo&utm_medium=badge"
                >
                    <img
                        className="download-image"
                        alt="download from google play"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
                    />
                </a>
            </Box>
        </Box>
    )
}

export default DownloadApplication
