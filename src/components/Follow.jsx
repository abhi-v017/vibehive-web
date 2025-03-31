import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import followService from '../services/followService'

function Follow({ image, username, fullName, userId, isFollowing }) {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const [following, setFollowing] = useState(isFollowing)
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        navigate(`/profile/${username}`)
    }

    const handleFollow = async (e) => {
        e.stopPropagation() // Prevent navigation when clicking the follow button
        if (!authStatus) {
            alert("You must be logged in to follow users.")
            return
        }

        setLoading(true)
        try {
            const response = await followService.followUserService(userId)
            if (response.success) {
                setFollowing(!following)
            }
        } catch (error) {
            console.error('Error following user:', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div 
            onClick={handleClick}
            className='flex items-center gap-4 p-4 bg-zinc-900 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer'
        >
            <img 
                className='w-12 h-12 rounded-full object-cover border-2 border-blue-500' 
                src={image} 
                alt={username} 
            />
            <div className="flex-1">
                <h3 className="text-white font-semibold">{fullName || username}</h3>
                <p className="text-gray-400 text-sm">@{username}</p>
            </div>
            {authStatus && (
                <button
                    onClick={handleFollow}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        following 
                            ? 'bg-zinc-700 text-white hover:bg-zinc-600' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {loading ? '...' : following ? 'Following' : 'Follow'}
                </button>
            )}
        </div>
    )
}

export default Follow
