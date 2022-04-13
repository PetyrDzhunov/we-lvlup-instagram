import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { RootState } from '../../store'

function HomePage(): JSX.Element {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    )
    console.log(isAuthenticated)

    return (
        <PageLayout>
            <Box>
                Home Page
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
                <p>Hello this is the Home page</p>
            </Box>
        </PageLayout>
    )
}

export default HomePage
