import React, { useEffect, useState } from 'react'
import profileService from '../services/profileService'
import { Container, Post } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        profileService.getAllPosts().then((response) => {
            if (response && response.data.posts) {
                setPosts(response.data.posts);
            }
        })
    }, [])
    return (
        <div className='min-h-[89.5vh] bg-zinc-950'>
            <Container>
                <div className='flex flex-wrap flex-col overflow-y-auto items-center py-2'>
                    {
                        posts.map((post) => (
                            <div className='p-2 w-1/4 flex-[0 0 auto] max-md:w-[60%]' key={post._id}>
                                <Post title={post.title}
                                    description={post.description}
                                    images={post.images}
                                    tags={post.tags}
                                    postId={post._id}
                                    isLiked={post.isLiked}
                                    likes={post.likes}/>
                            </div>
                        ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
