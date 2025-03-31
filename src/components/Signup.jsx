import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [avtarFile, setAvtarFile] = useState(null)
    const [coverImageFile, setCoverImageFile] = useState(null)
    const [avtarPreview, setAvtarPreview] = useState(null)
    const [coverImagePreview, setCoverImagePreview] = useState(null)

    const handleAvtarChange = (event) => {
        const file = event.target.files[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file for avtar')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Avtar image size should be less than 5MB')
            return
        }

        setAvtarFile(file)
        setAvtarPreview(URL.createObjectURL(file))
        setError('')
    }

    const handleCoverImageChange = (event) => {
        const file = event.target.files[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file for cover image')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Cover image size should be less than 5MB')
            return
        }

        setCoverImageFile(file)
        setCoverImagePreview(URL.createObjectURL(file))
        setError('')
    }

    const signupHandler = async (data) => {
        setError('')
        setLoading(true)
        
        try {
            // Create FormData for file uploads
            const formData = new FormData()
            formData.append('username', data.username)
            formData.append('email', data.email)
            formData.append('password', data.password)
            formData.append('fullName', data.fullName)
            formData.append('bio', data.bio)
            formData.append('location', data.location)
            formData.append('dob', data.dob)

            if (avtarFile) {
                formData.append('avtar', avtarFile)
            }
            if (coverImageFile) {
                formData.append('coverImage', coverImageFile)
            }

            const response = await authService.signUpService(formData)
            if (response?.data?.accessToken) {
                const currentUser = await authService.getUserService()
                dispatch(login(currentUser.data))
                navigate('/')
            } else {
                setError('Invalid response from server')
            }
        } catch (error) {
            setError(error.message || 'Signup failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className='bg-zinc-950 text-white p-4 w-full h-[88.1vh] flex justify-center items-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div>
            </div>
        )
    }

    return (
        <div className='bg-zinc-950 text-white p-4 w-full min-h-[88.1vh] flex justify-center items-center'>
            <form onSubmit={handleSubmit(signupHandler)} className='border-2 border-zinc-700 rounded-lg py-6 px-4 shadow-lg shadow-white/20 w-full max-w-2xl'>
                <h1 className='py-2 px-2 font-bold text-2xl text-center mb-6'>Create Your Account</h1>
                {error && (
                    <div className='bg-red-500/20 border border-red-500 text-red-500 px-4 py-2 rounded-lg mx-2 mb-6'>
                        {error}
                    </div>
                )}
                
                {/* Profile Images Section */}
                <div className='flex flex-col items-center gap-4 mb-6'>
                    <div className='w-full'>
                        <label className='block text-sm font-medium mb-2'>Cover Image</label>
                        <div className='relative'>
                            <img
                                src={coverImagePreview || "https://via.placeholder.com/800x200"}
                                alt="Cover"
                                className='w-full h-48 object-cover border-4 border-zinc-700 rounded-lg'
                            />
                            <input
                                type="file"
                                onChange={handleCoverImageChange}
                                accept="image/*"
                                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                            />
                        </div>
                        <p className='text-sm text-zinc-400 mt-1'>Click to upload cover image (max 5MB)</p>
                    </div>
                    
                    <div className='relative -mt-16'>
                        <label className='block text-sm font-medium mb-2'>Profile Picture</label>
                        <div className='relative'>
                            <img
                                src={avtarPreview || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className='w-32 h-32 rounded-full object-cover border-4 border-zinc-700'
                            />
                            <input
                                type="file"
                                onChange={handleAvtarChange}
                                accept="image/*"
                                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full'
                            />
                        </div>
                        <p className='text-sm text-zinc-400 mt-1'>Click to upload profile picture (max 5MB)</p>
                    </div>
                </div>

                {/* Form Fields Section */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1 text-sm font-medium' htmlFor="email">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors' 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Enter your email" 
                        />
                        {errors.email && (
                            <span className='text-red-500 text-sm'>{errors.email.message}</span>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='px-1 text-sm font-medium' htmlFor="username">Username</label>
                        <input
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters"
                                }
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors' 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Choose a username" 
                        />
                        {errors.username && (
                            <span className='text-red-500 text-sm'>{errors.username.message}</span>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='px-1 text-sm font-medium' htmlFor="fullName">Full Name</label>
                        <input
                            {...register("fullName", {
                                required: "Full name is required"
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors' 
                            type="text" 
                            id="fullName" 
                            name="fullName" 
                            placeholder="Enter your full name" 
                        />
                        {errors.fullName && (
                            <span className='text-red-500 text-sm'>{errors.fullName.message}</span>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='px-1 text-sm font-medium' htmlFor="password">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors' 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Create a password" 
                        />
                        {errors.password && (
                            <span className='text-red-500 text-sm'>{errors.password.message}</span>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='px-1 text-sm font-medium' htmlFor="location">Location</label>
                        <input
                            {...register("location", {
                                required: "Location is required"
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors' 
                            type="text" 
                            id="location" 
                            name="location" 
                            placeholder="Enter your location" 
                        />
                        {errors.location && (
                            <span className='text-red-500 text-sm'>{errors.location.message}</span>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='px-1 text-sm font-medium' htmlFor="dob">Date of Birth</label>
                        <input
                            {...register("dob", {
                                required: "Date of birth is required"
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors' 
                            type="date" 
                            id="dob" 
                            name="dob" 
                        />
                        {errors.dob && (
                            <span className='text-red-500 text-sm'>{errors.dob.message}</span>
                        )}
                    </div>
                </div>

                <div className='flex flex-col gap-2 mt-4'>
                    <label className='px-1 text-sm font-medium' htmlFor="bio">Bio</label>
                    <textarea
                        {...register("bio", {
                            required: "Bio is required"
                        })}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors min-h-[100px] resize-none' 
                        id="bio" 
                        name="bio" 
                        placeholder="Tell us about yourself" 
                    />
                    {errors.bio && (
                        <span className='text-red-500 text-sm'>{errors.bio.message}</span>
                    )}
                </div>
                
                <button 
                    type='submit' 
                    className='bg-blue-500 text-white hover:bg-blue-600 border-2 rounded-lg px-4 py-2 font-semibold w-full mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p className="mt-4 text-center text-sm text-zinc-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 hover:text-blue-400 transition-colors"
                    >
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Signup
