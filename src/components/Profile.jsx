import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import profileService from '../services/profileService'
import { Container } from './index'

function Profile() {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [posts, setPosts] = useState([])
    const [postsLoading, setPostsLoading] = useState(true)
    const [postsError, setPostsError] = useState('')

    useEffect(() => {
        if (!authStatus) {
            navigate('/login')
            return
        }

        const fetchProfileData = async () => {
            try {
                setLoading(true)
                setError('')
                const response = await profileService.getProfileService()
                if (response.success) {
                    setProfile(response.data)
                } else {
                    setError(response.message || 'Failed to fetch profile')
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch profile')
            } finally {
                setLoading(false)
            }
        }

        const fetchUserPosts = async () => {
            try {
                setPostsLoading(true)
                setPostsError('')
                const response = await profileService.getmyPosts()
                if (response.success) {
                    setPosts(response.data.posts)
                } else {
                    setPostsError(response.message || 'Failed to fetch posts')
                }
            } catch (error) {
                setPostsError(error.message || 'Failed to fetch posts')
            } finally {
                setPostsLoading(false)
            }
        }

        fetchProfileData()
        fetchUserPosts()
    }, [authStatus, navigate])

    const handleFollowers = () => {
        if (profile?.username) {
            navigate(`/profile/${profile.username}/followers`)
        }
    }

    const handleFollowing = () => {
        if (profile?.username) {
            navigate(`/profile/${profile.username}/followings`)
        }
    }

    const handleUpdateProfile = () => {
        navigate('/update-profile')
    }

    if (loading) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Container>
        )
    }

    if (error) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[89.5vh] w-full">
                    <div className="text-red-500 text-center">
                        <p className="text-xl font-semibold mb-2">Error</p>
                        <p>{error}</p>
                    </div>
                </div>
            </Container>
        )
    }

    if (!profile) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[89.5vh] w-full">
                    <div className="text-gray-500 text-center">
                        <p className="text-xl font-semibold">No Profile Found</p>
                    </div>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="p-4 bg-black min-h-[89.5vh] w-full">
                {/* Profile Header */}
                <div className="bg-zinc-900 rounded-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative">
                            <img
                                src={profile.avtar || "https://via.placeholder.com/150"}
                                alt={profile.username}
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                            />
                            <button
                                onClick={handleUpdateProfile}
                                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-2xl font-bold text-white mb-2">{profile.fullName}</h1>
                            <p className="text-gray-400 mb-4">@{profile.username}</p>
                            <p className="text-gray-300 mb-4">{profile.bio || 'No bio yet'}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                <p>{profile.location || 'No location set'}</p>
                                <p>•</p>
                                <p>Joined {new Date(profile.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <button
                                onClick={handleFollowers}
                                className="bg-zinc-800 text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors"
                            >
                                <span className="font-bold">{profile.followersCount}</span> Followers
                            </button>
                            <button
                                onClick={handleFollowing}
                                className="bg-zinc-800 text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors"
                            >
                                <span className="font-bold">{profile.followingCount}</span> Following
                            </button>
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4">Posts</h2>
                    {postsLoading ? (
                        <div className="flex justify-center items-center min-h-[200px]">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : postsError ? (
                        <div className="text-red-500 text-center">
                            <p>{postsError}</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                            <p>No posts yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <div key={post._id} className="bg-zinc-900 rounded-lg overflow-hidden">
                                    {post.images && post.images.length > 0 && (
                                        <img
                                            src={post.images[0].url}
                                            alt={post.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                                        <p className="text-gray-400 text-sm mb-2">{post.description}</p>
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags.map((tag, index) => (
                                                    <span key={index} className="text-blue-400 text-sm">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-2">
                                                <button className="text-gray-400 hover:text-blue-500 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                                    </svg>
                                                </button>
                                                <span className="text-gray-400 text-sm">{post.likes || 0}</span>
                                            </div>
                                            <span className="text-gray-500 text-sm">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Container>
    )
}

export default Profile
