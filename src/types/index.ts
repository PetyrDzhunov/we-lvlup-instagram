export interface PageProps {
    title?: string
    authentication?: boolean
}

type PostCreator = {
    email: string
    uid: string
}

type Comment = {
    commentator: string
    comment: string
}

// type Follower = string

export interface Post {
    creator: PostCreator
    likes: string[]
    dislikes: string[]
    comments: Comment[]
    image: string
    id: string
    description?: string
}

// export interface User {
//     authID: string
//     email: string
//     followers: Follower[]
//     fullName?: string
//     userName?: string
//     profilePicture?: string
// }
