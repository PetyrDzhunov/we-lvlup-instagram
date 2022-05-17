import Paper from '@mui/material/Paper'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import '../../styles/pageLayout.css'
import { useMediaQuery } from '@mui/material'
import MobileLayoutNavigation from './MobileLayoutNavigation'
import LayoutFooter from './LayoutFooter'
import { useAppSelector } from '../../hooks/redux-hooks'
import DesktopLayoutNavigation from './DesktopLayoutNavigation'

interface PageLayoutProps {
    children: React.ReactNode
}

function PageLayout({ children }: PageLayoutProps): JSX.Element {
    const theme = useTheme()
    const isBiggerThanMedium = useMediaQuery(theme.breakpoints.up('sm'))
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

    // const theme = useTheme()
    // const isBiggerThanSmall = useMediaQuery(theme.breakpoints.up('sm'))
    // const isLaptop = useMediaQuery(theme.breakpoints.up('lg'))

    return (
        <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
            <Paper>
                {isBiggerThanMedium ? (
                    <DesktopLayoutNavigation />
                ) : (
                    <MobileLayoutNavigation />
                )}
                {children}
                {!isBiggerThanMedium && <LayoutFooter />}
            </Paper>
        </ThemeProvider>
    )
}

export default PageLayout
