import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface SinglePostImageProps {
    id: string
    image: string
    small?: boolean
}

function SinglePostImage({
    id,
    image,
    small,
}: SinglePostImageProps): JSX.Element {
    const navigate = useNavigate()
    return (
        <LazyLoadImage
            onClick={() => navigate(`/posts/${id}`)}
            src={image}
            alt=""
            width={small ? '32.3%' : '99%'}
        />
    )
}

export default memo(SinglePostImage)
