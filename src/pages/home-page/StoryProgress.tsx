import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

function StoryProgress(): JSX.Element {
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0
                }
                if (oldProgress > 95) {
                    return 100
                }
                return oldProgress + 20
            })
        }, 500)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    )
}

export default StoryProgress
