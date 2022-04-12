/* eslint-disable max-len */
import { Typography } from '@mui/material'
import '../styles/meta-footer.css'

function GuestPageFooter(): JSX.Element {
    return (
        <footer className="meta-footer">
            <Typography variant="body2" sx={{ color: '#8e8e8e' }}>
                from
            </Typography>
            <img
                className="meta-footer__image"
                alt=""
                src="https://uploads-ssl.webflow.com/6036926b00aa1a05525430a4/61f91dcebe4f0e08a9bdbbc8_meta%20client%20logo.png"
            />
        </footer>
    )
}
export default GuestPageFooter
