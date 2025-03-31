import React, { useEffect, useState } from 'react'
import { Follow } from '../components'
import { useParams } from 'react-router-dom'
import followService from '../services/followService'
import { Container } from '../components'

function Following() {
    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { username } = useParams()

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                setLoading(true)
                setError('')
                const response = await followService.followingListService(username)
                if (response.success) {
                    setFollowing(response.data.following)
                } else {
                    setError(response.message || 'Failed to fetch following')
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch following')
            } finally {
                setLoading(false)
            }
        }

        if (username) {
            fetchFollowing()
        }
    }, [username])

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

    if (following.length === 0) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="text-gray-500 text-center">
                        <p className="text-xl font-semibold">No Following Yet</p>
                        <p className="text-sm mt-2">When someone follows you, they'll appear here</p>
                    </div>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-2xl font-bold text-white mb-6">Following</h1>
                <div className="space-y-4">
                    {following.map((following) => (
                        <div key={following._id} className="w-full">
                            <Follow
                                image={following.avtar || "https://via.placeholder.com/150"}
                                username={following.username}
                                fullName={following.fullName}
                                userId={following._id}
                                isFollowing={following.isFollowing}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default Following
