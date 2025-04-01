import React, { useState, useEffect } from 'react'
import likeService from '../services/likeService';
import profileService from '../services/profileService';
import { useSelector } from 'react-redux';


function post({ title, description, images, tags, postId, isLiked, likes }) {
    const authStatus = useSelector((state) => state.auth.status)
    const [liked, setLiked] = useState(isLiked)
    const [currentLikes, setCurrentLikes] = useState(likes);
    useEffect(() => {
        if (!authStatus) {
            setLiked(false); // Reset liked state to false when logged out
        }
    }, [authStatus]);
    const likePost = async () => {
        if (!authStatus) {
            alert("You must be logged in to like a post.");
            return;
        }
        
        try {
            const response = await likeService.likePostService(postId);
            console.log(response);
            
            const updatedPost = await profileService.getPostById(postId);
            console.log(updatedPost)
            setLiked(updatedPost.data.isLiked)
            setCurrentLikes(updatedPost.data.likes);
            
        } catch (error) {
            console.error('Error liking post:', error.message);
        }
    }
    return (
        <div className='bg-zinc-900 text-white border-zinc-700 border-2 rounded-lg p-2 flex justify-center items-start flex-col'>
            {images && images.length > 0 && (
                <img className=' h-60 border-2 border-zinc-800 rounded-lg p-2 mx-auto hover:shadow-md hover:shadow-zinc-700/40' src={images[0].url} alt="Post" /> // Ensure you access the correct image URL
            )}
            <p className='py-1 my-1'>{title}</p>
            <p className='py-1 my-1'>{description}</p>

            {tags && tags.length > 0 && (
                <div className="py-1 my-1 text-zinc-500">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
            )}
            <button className='cursor-pointer' onClick={likePost}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    width="24" 
                    height="24" 
                    fill={liked ? "red" : "none"}
                    stroke={liked ? "red" : "currentColor"}
                >
                    <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" />
                </svg>
            </button>
            <span className='px-2'>{currentLikes}</span>
        </div>
    );
}

export default post
