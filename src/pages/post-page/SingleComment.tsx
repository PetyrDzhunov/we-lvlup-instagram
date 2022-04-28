import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
// import { useAppSelector } from '../../hooks/redux-hooks'
import { Comment } from '../../types'

interface SingleCommentProps {
    comment: Comment
}

function SingleComment({ comment }: SingleCommentProps): JSX.Element {
    const currentCommentCreator = useAppSelector((state) => {
        return state.users.allUsers.find(
            (currUser) => currUser.authID === comment.commentatorID
        )
    })

    const navigate = useNavigate()

    return (
        <ListItem>
            <Avatar
                onClick={() =>
                    navigate(`/profile/${currentCommentCreator?.authID}`)
                }
                alt="Profile picture of the user"
                src={
                    currentCommentCreator
                        ? currentCommentCreator?.profileImage
                        : '/broken-image.jpg'
                }
            />
            <Typography
                variant="body2"
                component="h6"
                sx={{
                    color: 'text.primary',
                    fontWeight: '600',
                    marginTop: '4px',
                    marginLeft: '10px',
                }}
            >
                {comment.commentator}
                <Typography
                    variant="body2"
                    component="p"
                    sx={{
                        color: 'text.primary',
                        fontWeight: '400',
                        marginTop: '4px',
                        marginLeft: '5px',
                        display: 'inline',
                        wordBreak: 'break-all',
                    }}
                >
                    {comment.comment}
                </Typography>
            </Typography>
        </ListItem>
    )
}
export default SingleComment
