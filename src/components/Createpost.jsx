import React, { useState } from 'react'
import profileService from '../services/profileService'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Createpost() {
    const authStatus = useSelector((state) => state.auth.status)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState(null);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    if (!authStatus) {
        navigate('/login');
        return null;
    }

    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files.length > 5) {
            setError('You can only upload up to 5 images');
            event.target.value = '';
            return;
        }
        setImages(files);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim()) {
            setError('title is required');
            return;
        }

        if (!images || images.length === 0) {
            setError('At least one image is required');
            return;
        }

        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('description', description.trim())
        
        // Append images
        Array.from(images).forEach((image, index) => {
            formData.append('images', image);
        });

        // Append tags if any
        if (tags.trim()) {
            const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            tagsArray.forEach((tag, index) => {
                formData.append(`tags[${index}]`, tag);
            });
        }

        setLoading(true);
        try {
            const response = await profileService.CreatePostService(formData);
            if (response?.data) {
                navigate('/');
            } else {
                setError('Failed to create post');
            }
        } catch (error) {
            setError(error.message || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className='bg-zinc-900 h-[88.1vh] flex items-center justify-center text-white'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div>
            </div>
        )
    }

    return (
        <div className='bg-zinc-900 h-[89.6vh] flex items-center justify-center text-white'>
            <div className='w-1/2 max-md:w-[80%] border-2 border-zinc-600 rounded-xl bg-zinc-950 p-4 shadow-lg shadow-white/35'>
                <h1 className='text-center font-bold text-2xl p-2'>Create New Post</h1>
                {error && (
                    <div className='bg-red-500/20 border border-red-500 text-red-500 px-4 py-2 rounded-lg mx-2 mb-4'>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-start'>
                    <div className='flex justify-center items-start flex-col gap-4 text-lg m-2 w-full'>
                        <label htmlFor="images" className='font-medium'>Upload Images:</label>
                        <input
                            className='rounded-xl m-1 border-2 border-zinc-600 w-full p-2 bg-transparent focus:outline-none focus:border-white transition-colors'
                            type="file"
                            id="images"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple
                            required
                        />
                        <p className='text-sm text-zinc-400'>You can upload up to 5 images</p>
                    </div>
                    <div className='flex justify-center items-start flex-col gap-4 text-lg m-2 w-full'>
                        <label htmlFor="title" className='font-medium'>title:</label>
                        <textarea
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1 w-full min-h-[100px] focus:outline-none focus:border-white transition-colors'
                            id="title"
                            value={title}
                            onChange={(e) => title(e.target.value)}
                            placeholder="What's on your mind?"
                            required
                        />
                    </div>
                    <div className='flex justify-center items-start flex-col gap-4 text-lg m-2 w-full'>
                        <label htmlFor="description" className='font-medium'>description:</label>
                        <textarea
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1 w-full min-h-[100px] focus:outline-none focus:border-white transition-colors'
                            id="description"
                            value={description}
                            onChange={(e) => description(e.target.value)}
                            placeholder="Enter you Description!!!"
                            required
                        />
                    </div>
                    <div className='flex justify-center items-start flex-col gap-4 text-lg m-2 w-full'>
                        <label htmlFor="tags" className='font-medium'>Tags (comma separated):</label>
                        <input
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1 w-full focus:outline-none focus:border-white transition-colors'
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g., #fun, #life, #memories"
                        />
                    </div>
                    <button 
                        className='bg-white text-black hover:bg-zinc-200 border-2 my-2 rounded-2xl px-4 py-2 font-semibold w-full transition-colors' 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating Post...' : 'Create Post'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Createpost
