import React, { useEffect, useState } from 'react'
import { Follow } from '../components'
import { useParams } from 'react-router-dom'
import followService from '../services/followService'
import { Container } from '../components'

function Followers() {
    const [followers, setFollowers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { username } = useParams()

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                setLoading(true)
                setError('')
                const response = await followService.followerListService(username)
                if (response.success) {
                    setFollowers(response.data.followers)
                } else {
                    setError(response.message || 'Failed to fetch followers')
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch followers')
            } finally {
                setLoading(false)
            }
        }

        if (username) {
            fetchFollowers()
        }
    }, [username])

    if (loading) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[89.5vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Container>
        )
    }

    if (error) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[89.5vh]">
                    <div className="text-red-500 text-center">
                        <p className="text-xl font-semibold mb-2">Error</p>
                        <p>{error}</p>
                    </div>
                </div>
            </Container>
        )
    }

    if (followers.length === 0) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[89.5vh]">
                    <div className="text-gray-500 text-center">
                        <p className="text-xl font-semibold">No Followers Yet</p>
                        <p className="text-sm mt-2">When someone follows you, they'll appear here</p>
                    </div>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="w-full min-h-[89.5vh] p-4 bg-black">
                <h1 className="text-2xl font-bold text-white mb-6">Followers</h1>
                <div className="space-y-4">
                    {followers.map((follower) => (
                        <div key={follower._id} className="w-full">
                            <Follow
                                image={follower.avtar || "https://via.placeholder.com/150"}
                                username={follower.username}
                                fullName={follower.fullName}
                                userId={follower._id}
                                isFollowing={follower.isFollowing}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default Followers
