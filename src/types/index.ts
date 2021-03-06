import { Timestamp } from 'firebase/firestore'

export interface PageProps {
    title?: string
    authentication?: boolean
}

type PostCreator = {
    email: string
    uid: string
}

export type Story = {
    createdAt: Timestamp
    expiresAt: Date
    image: string
}

export interface Comment {
    commentator: string
    comment: string
    commentatorID: string
    id?: string
    commentID: string
    likes: string[]
    replies?: Reply[]
}

export type Reply = {
    replyUserID: string
    reply: string
    replyID: string
    replier: string
    commentID: string
    replyLikes: string[]
    postID?: string
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
    status?: boolean
    fullName?: string
    profileImage?: string
    username?: string
    story?: Story
}

export interface Message {
    message: string
    creatorID: string
}

export interface ChatRoom {
    created: Timestamp
    id: string
    messages: Message[]
    participant1: User
    participant2: User
    docID?: string
}
