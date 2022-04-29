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
    likes: string[]
    replies?: Comment[]
}

export interface ReduxComment extends Comment {
    id: string
}

type Follower = string

export interface Post {
    creator: PostCreator
    likedBy: string[]
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
    followed: Follower[]
    fullName?: string
    profileImage?: string
    username?: string
}
