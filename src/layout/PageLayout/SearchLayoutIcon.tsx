import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'

interface SearchLayoutIconProps {
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchLayoutIcon({
    setIsSearching,
}: SearchLayoutIconProps): JSX.Element {
    const searchHandler = (): void => {
        setIsSearching((prevSearchState) => !prevSearchState)
    }
    return (
        <IconButton onClick={searchHandler}>
            <SearchIcon fontSize="medium" sx={{ color: 'text.primary' }} />
        </IconButton>
    )
}

export default SearchLayoutIcon
