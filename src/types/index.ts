export interface PageProps {
    title?: string
    authentication?: boolean
}

type PostCreator = {
    email: string
    uid: string
}

export interface Comment {
    commentator: string
    comment: string
    commentatorID: string
    commentID: string
}

export interface ReduxComment extends Comment {
    id: string
}

type Follower = string

export interface Post {
    creator: PostCreator
    likes: string[]
    dislikes: string[]
    comments: Comment[]
    image: string
    id?: string
    description?: string
    docID?: string
}

export interface User {
    authID: string
    email: string
    followers: Follower[]
    fullName?: string
    profileImage?: string
    username?: string
}
