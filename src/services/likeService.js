import axios from "axios";

export class LikeService {
    async likePostService(postId) {
        const options = {
            method: 'POST',
            url: `http://localhost:8000/api/v1/likes/like/${postId}`,
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to like post');
        }
    }
}

const likeService = new LikeService();
export default likeService;