import { DocumentData, QuerySnapshot } from 'firebase/firestore/lite'

import { Post } from '../../../types'

// utility function to return all posts with their data
export const getFilteredPosts = (
    posts: QuerySnapshot<DocumentData>
): Post[] => {
    const allPosts: Post[] = []
    posts.forEach((post) => {
        if (post.exists()) {
            allPosts.push({ ...post.data(), docID: post.id } as Post)
        }
    })
    return allPosts
}
