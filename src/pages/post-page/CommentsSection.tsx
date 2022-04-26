import { Comment } from '../../types'

interface CommentsSectionProps {
    comment: Comment
}

function CommentsSection({ comment }: CommentsSectionProps): JSX.Element {
    // all the comments will be loaded initially and update the redux store so i can get them with appselector here and use them

    console.log(comment)
    return <div>comments section</div>
}
export default CommentsSection
