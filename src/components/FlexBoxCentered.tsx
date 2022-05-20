import { ElementType } from 'react'

import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'
import { makeStyles } from '@mui/styles'

type flexDirectionType = 'row wrap' | 'column wrap'

interface FlexBoxCenteredProps {
    children: React.ReactNode
    sx?: SxProps
    onClick?: React.MouseEventHandler<HTMLDivElement>
    component?: ElementType
    flexDirection?: flexDirectionType
}

function FlexBoxCentered({
    children,
    sx,
    onClick,
    component,
    flexDirection,
}: FlexBoxCenteredProps): JSX.Element {
    const useStyles = makeStyles(() => {
        return {
            root: {
                display: 'flex',
                flexFlow: flexDirection,
                justifyContent: 'center',
                alignItems: 'center',
            },
        }
    })
    const classes = useStyles()
    return (
        <Box
            className={classes.root}
            sx={sx}
            onClick={onClick}
            component={component}
        >
            {children}
        </Box>
    )
}

export default FlexBoxCentered
