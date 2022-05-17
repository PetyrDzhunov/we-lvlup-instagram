import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'

interface SearchLayoutIconProps {
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
    desktop?: boolean
}

function SearchLayoutIcon({
    setIsSearching,
    desktop,
}: SearchLayoutIconProps): JSX.Element {
    const searchHandler = (): void => {
        setIsSearching((prevSearchState) => !prevSearchState)
    }
    return (
        <IconButton onClick={searchHandler}>
            <SearchIcon
                fontSize="medium"
                sx={{
                    color: 'text.primary',
                    fontSize: desktop ? '2.2rem' : '1.5rem',
                }}
            />
        </IconButton>
    )
}

export default SearchLayoutIcon
