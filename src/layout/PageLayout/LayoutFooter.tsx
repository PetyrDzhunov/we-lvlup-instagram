import { useState } from 'react'

import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar/AppBar'
import HomeLayoutIcon from './HomeLayoutIcon'
import SearchInput from '../../components/SearchInput'
import SearchLayoutIcon from './SearchLayoutIcon'
import LayoutSwitchThemeIcon from './LayoutSwitchThemeIcon'
import ProfileLayoutIcon from './ProfileLayoutIcon'

function LayoutFooter(): JSX.Element {
    const [isSearching, setIsSearching] = useState<boolean>(false)

    return (
        <AppBar
            position="fixed"
            color="primary"
            sx={{ top: 'auto', bottom: 0, bgcolor: 'background.paper' }}
        >
            {isSearching && <SearchInput />}
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <HomeLayoutIcon />
                <SearchLayoutIcon setIsSearching={setIsSearching} />
                <LayoutSwitchThemeIcon />
                <ProfileLayoutIcon />
            </Toolbar>
        </AppBar>
    )
}

export default LayoutFooter
