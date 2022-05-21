/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

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
        <img
            onClick={() => navigate(`/posts/${id}`)}
            src={image}
            alt=""
            className={
                small ? 'single-post__image--small' : 'single-post__image'
            }
        />
    )
}

export default memo(SinglePostImage)
