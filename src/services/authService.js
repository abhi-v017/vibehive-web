import axios from 'axios';

export class AuthService {
    async loginService(email, password) {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/api/v1/users/login',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            data: { password, email }
        };
        try {
            const { data } = await axios.request(options);
            if (data?.data?.accessToken) {
                localStorage.setItem('accessToken', data.data.accessToken);
                localStorage.setItem('refreshToken', data.data.refreshToken);
            }
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }

    async getUserService() {
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
            throw new Error(error.response?.data?.message || 'Failed to get user');
        }
    }

    async signUpService(formData) {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/api/v1/users/register',
            headers: { 
                accept: 'application/json',
                'content-type': 'multipart/form-data'
            },
            data: formData
        };
        try {
            const response = await axios.request(options);
            return response?.data || null;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Signup failed');
        }
    }

    async logoutService() {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/api/v1/users/logout',
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Logout failed');
        }
    }

    async refreshTokenService() {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/api/v1/users/refresh-token',
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            if (data?.data?.accessToken) {
                localStorage.setItem('accessToken', data.data.accessToken);
                localStorage.setItem('refreshToken', data.data.refreshToken);
            }
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Token refresh failed');
        }
    }
}

const authService = new AuthService();
export default authService;