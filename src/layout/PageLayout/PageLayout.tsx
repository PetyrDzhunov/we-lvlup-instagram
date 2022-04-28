import Paper from '@mui/material/Paper'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import '../../styles/pageLayout.css'
import LayoutNavigation from './LayoutNavigation'
import LayoutFooter from './LayoutFooter'
import { useAppSelector } from '../../hooks/redux-hooks'

interface PageLayoutProps {
    children: React.ReactNode
}

function PageLayout({ children }: PageLayoutProps): JSX.Element {
    const loggedInUserTheme = useAppSelector(
        (state) => state.persistedReducer.auth.theme
    )

    const isLightTheme = loggedInUserTheme === 'light'

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    })

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    })

    return (
        <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
            <Paper>
                <LayoutNavigation />
                <div>{children}</div>
                <LayoutFooter />
            </Paper>
        </ThemeProvider>
    )
}

export default PageLayout
