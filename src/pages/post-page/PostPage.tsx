/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import Picker from 'emoji-picker-react'
import Box from '@mui/material/Box'
import SinglePost from '../../components/SinglePost'
import { useAppSelector } from '../../hooks/redux-hooks'
import PageLayout from '../../layout/PageLayout/PageLayout'
import { PageProps } from '../../types'
import '../../styles/post-page.css'

function PostPage({ title }: PageProps): JSX.Element {
    const [inputStr, setInputStr] = useState('')
    const [showPicker, setShowPicker] = useState(false)

    const onEmojiClick = (
        event: React.MouseEvent<Element, MouseEvent>,
        emojiObject: any
    ): void => {
        console.log(emojiObject.emoji)
        setInputStr((prevInput) => prevInput + emojiObject.emoji)
        setShowPicker(false)
    }

    const { isAuthenticated } = useAppSelector(
        (state) => state.persistedReducer.auth
    )
    const { postID } = useParams()
    const currentPost = useAppSelector((state) =>
        state.posts.allPosts.find((post) => post.id === postID)
    )

    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/')
        }
    }, [isAuthenticated, navigate])

    return (
        <PageLayout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <SinglePost key={currentPost?.id} post={currentPost!} />
            <Box className="picker-container">
                <input
                    className="comment-input"
                    value={inputStr}
                    onChange={(e) => setInputStr(e.target.value)}
                    placeholder="Добави коментар..."
                />
                <img
                    alt=""
                    className="emoji-icon"
                    src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                    onClick={() => setShowPicker((val) => !val)}
                />
                {showPicker && (
                    <Picker
                        pickerStyle={{ width: '100%' }}
                        onEmojiClick={onEmojiClick}
                    />
                )}
            </Box>
        </PageLayout>
    )
}
export default PostPage
