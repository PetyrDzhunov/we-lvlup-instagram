/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
interface SinglePostImageProps {
    image: string
    small?: boolean
}

function SinglePostImage({ image, small }: SinglePostImageProps): JSX.Element {
    return (
        <img
            src={image}
            alt=""
            className={
                small ? 'single-post__image--small' : 'single-post__image'
            }
        />
    )
}

export default SinglePostImage
