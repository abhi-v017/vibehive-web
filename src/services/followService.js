import axios from "axios";

export class FollowService {
    async followUserService(userId) {
        const options = {
            method: 'POST',
            url: `http://localhost:8000/api/v1/follows/follow/${userId}`,
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to follow user');
        }
    }

    async followerListService(username) {
        const options = {
            method: 'GET',
            url: `http://localhost:8000/api/v1/follows/followers-list/${username}`,
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get followers list');
        }
    }

    async followingListService(username) {
        const options = {
            method: 'GET',
            url: `http://localhost:8000/api/v1/follows/following-list/${username}`,
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get following list');
        }
    }
}

const followService = new FollowService();
export default followService;