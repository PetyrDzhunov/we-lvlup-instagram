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
    height?: string
}

function PageLayout({ children, height }: PageLayoutProps): JSX.Element {
    const theme = useTheme()
    const isBiggerThanMedium = useMediaQuery(theme.breakpoints.up('sm'))
    const isLaptop = useMediaQuery(theme.breakpoints.up('lg'))
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

    let currHeight
    if (height) {
        currHeight = height
    } else if (isLaptop) {
        currHeight = '100%'
    } else if (!isLaptop) {
        currHeight = '100vh'
    }

    return (
        <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
            <Paper
                sx={{
                    height: currHeight,
                }}
            >
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
