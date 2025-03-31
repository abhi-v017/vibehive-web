import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import profileService from '../services/profileService'
import { Container, Post } from '../components';
import followService from '../services/followService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

function Profile() {
    const authStatus = useSelector((state) => state.auth.status)
    const { username } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true)
                setError('')
                const response = await profileService.getProfileByUsername(username)
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

        if (username) {
            fetchProfile()
        }
    }, [username])

    const handleFollow = async () => {
        if (!authStatus) {
            alert("You must be logged in to follow the user.")
            return
        }
        try {
            const response = await followService.followUserService(profile._id)
            if (response.success) {
                // Refresh profile data to update follow status
                const updatedProfile = await profileService.getProfileByUsername(username)
                if (updatedProfile.success) {
                    setProfile(updatedProfile.data)
                }
            }
        } catch (error) {
            console.error('Error following user:', error.message)
        }
    }

    const handleFollowers = () => {
        navigate(`/profile/${username}/followers`)
    }

    const handleFollowing = () => {
        navigate(`/profile/${username}/followings`)
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
                <div className="flex justify-center items-center min-h-[60vh]">
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
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="text-gray-500 text-center">
                        <p className="text-xl font-semibold">Profile Not Found</p>
                    </div>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="max-w-4xl mx-auto p-4">
                {/* Profile Header */}
                <div className="bg-zinc-900 rounded-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative">
                            <img
                                src={profile.avtar || "https://via.placeholder.com/150"}
                                alt={profile.username}
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                            />
                            {authStatus && profile.username !== localStorage.getItem('username') && (
                                <button
                                    onClick={handleFollow}
                                    className="absolute bottom-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    {profile.isFollowing ? 'Following' : 'Follow'}
                                </button>
                            )}
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
            </div>
        </Container>
    )
}

export default Profile
