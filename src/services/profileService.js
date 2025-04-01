import axios from "axios";

export class ProfileService {
    async CreatePostService(data) {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/api/v1/posts/create-post',
            headers: { 
                accept: 'application/json',
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: data
        }
        try {
            const { data } = await axios.request(options)
            return data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Post Creation Failed!!');
        }
    }

    async getProfileService() {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/api/v1/users/',
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };

        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get profile');
        }
    }

    async updateService(data) {
        const options = {
            method: 'PATCH',
            url: 'http://localhost:8000/api/v1/users/update-details',
            headers: { 
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: data
        };

        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update profile');
        }
    }

    async updateAvtarService(file) {
        const formData = new FormData();
        formData.append('avtar', file);
        
        const options = {
            method: 'PATCH',
            url: 'http://localhost:8000/api/v1/users/update-avtar',
            headers: { 
                accept: 'application/json',
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: formData
        };

        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update avtar');
        }
    }

    async updateCoverImageService(file) {
        const formData = new FormData();
        formData.append('coverImage', file);
        
        const options = {
            method: 'PATCH',
            url: 'http://localhost:8000/api/v1/users/update-cover-image',
            headers: { 
                accept: 'application/json',
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: formData
        };

        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update cover image');
        }
    }

    async getAllPosts() {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/api/v1/posts/all-posts',
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get posts');
        }
    }

    async getmyPosts() {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/api/v1/posts/get/my',
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get my posts');
        }
    }
    async getPostById(id){
        const options = {
            method: 'GET',
            url: `http://localhost:8000/api/v1/posts/get/${id}`,
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get profile');
        } 
    }
    async getProfileByUsername(username) {
        const options = {
            method: 'GET',
            url: `http://localhost:8000/api/v1/users/c/${username}`,
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get profile');
        }
    }

    async getPostByUsername(username) {
        const options = {
            method: 'GET',
            url: `http://localhost:8000/api/v1/posts/get/u/${username}`,
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get user posts');
        }
    }

    async deletePost(postId) {
        const options = {
            method: 'DELETE',
            url: `http://localhost:8000/api/v1/posts/delete/${postId}`,
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete post');
        }
    }

    async updatePostDetails(postId, data) {
        const options = {
            method: 'PATCH',
            url: `http://localhost:8000/api/v1/posts/update-post-detail/${postId}`,
            headers: { 
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: data
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update post');
        }
    }

    async updatePostImages(postId, files) {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });
        
        const options = {
            method: 'PATCH',
            url: `http://localhost:8000/api/v1/posts/update-post-image/${postId}`,
            headers: { 
                accept: 'application/json',
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: formData
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update post images');
        }
    }
}

const profileService = new ProfileService();
export default profileService;