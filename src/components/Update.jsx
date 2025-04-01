import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import profileService from '../services/profileService'
import { useSelector } from 'react-redux'

function Update() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [avtarLoading, setAvtarLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    const fileInputRef = useRef(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await profileService.getProfileService()
                if (response.success) {
                    setProfile(response.data)
                }
            } catch (error) {
                console.error('Error fetching profile:', error)
            }
        }

        if (authStatus) {
            fetchProfile()
        }
    }, [authStatus])

    if (!authStatus) {
        alert("You must be logged in to update the profile.");
        return;
    }

    const handleAvtarClick = () => {
        fileInputRef.current?.click()
    }

    const handleAvtarChange = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB')
            return
        }

        setError('')
        setAvtarLoading(true)

        try {
            const response = await profileService.updateAvtarService(file)
            if (response.success) {
                // Update local profile state
                setProfile(prev => ({
                    ...prev,
                    avtar: response.data.avtar
                }))
            }
        } catch (error) {
            setError(error.message || 'Failed to update avtar')
        } finally {
            setAvtarLoading(false)
        }
    }

    const handleUpdate = async (data) => {
        setError('');
        setLoading(true);
        try {
            const userProfile = await profileService.updateService(data);
            if (userProfile) {
                navigate('/profile');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if(loading){
        return(
            <span className='font-bold text-3xl text-white p-4 '>loading.....</span>
        )
    }

    return (
        <div className='bg-zinc-950 text-white p-4 w-full h-[89.5vh] flex justify-center items-center'>
            <form onSubmit={handleSubmit(handleUpdate)} className='border-2 border-zinc-700 rounded-lg py-3 px-2 shadow-lg shadow-white/20'>
                <h1 className='py-3 px-2 font-bold text-xl text-center'>Update Your Profile !!!</h1>
                {error && (
                    <div className='bg-red-500/20 border border-red-500 text-red-500 px-4 py-2 rounded-lg mx-2 mb-4'>
                        {error}
                    </div>
                )}
                <div className='flex items-center py-3 px-2 gap-3'>
                    <div className='flex flex-col items-center py-3 px-2 gap-3'>
                        <div className='relative'>
                            <img
                                src={profile?.avtar || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className='w-32 h-32 rounded-full object-cover border-4 border-blue-500 cursor-pointer hover:opacity-80 transition-opacity'
                                onClick={handleAvtarClick}
                            />
                            {avtarLoading && (
                                <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full'>
                                    <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white'></div>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvtarChange}
                                accept="image/*"
                                className='hidden'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='px-1' htmlFor="bio">Bio:</label>
                            <input
                                {...register("bio", {
                                    required: true
                                })}
                                defaultValue={profile?.bio}
                                className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' 
                                id="bio" 
                                name="bio" 
                                placeholder="bio" 
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='px-1' htmlFor="fullName">Full Name:</label>
                            <input
                                {...register("fullName", {
                                    required: true
                                })}
                                defaultValue={profile?.fullName}
                                className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' 
                                id="fullName" 
                                name="fullName" 
                                placeholder="fullName" 
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='px-1' htmlFor="username">Username:</label>
                            <input
                                {...register("username", {
                                    required: true
                                })}
                                defaultValue={profile?.username}
                                className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' 
                                id="username" 
                                name="username" 
                                placeholder="username" 
                            />
                        </div>
                    </div>
                    <div className='flex flex-col items-center py-3 px-2 gap-3'>
                        <div className='flex flex-col gap-2'>
                            <label className='px-1' htmlFor="location">Location:</label>
                            <input
                                {...register("location", {
                                    required: true
                                })}
                                defaultValue={profile?.location}
                                className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' 
                                id="location" 
                                name="location" 
                                placeholder="location" 
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='px-1' htmlFor="dob">Date of Birth:</label>
                            <input
                                {...register("dob", {
                                    required: true
                                })}
                                defaultValue={profile?.dob}
                                className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' 
                                id="dob" 
                                name="dob" 
                                placeholder="dob" 
                            />
                        </div>
                    </div>
                </div>
                <button 
                    type='submit' 
                    className='border-zinc-200 hover:bg-zinc-200 hover:text-black border-2 rounded-2xl px-2 py-1 font-semibold w-1/3'
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    )
}

export default Update
