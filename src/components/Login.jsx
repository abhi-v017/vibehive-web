import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../services/authService'
import { login } from '../store/authSlice'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const loginHandler = async (data) => {
        setError('')
        setLoading(true);
        try {
            const response = await authService.loginService(data.email, data.password)
            if (response?.data?.accessToken) {
                const currentUser = await authService.getUserService()
                dispatch(login(currentUser.data));
                navigate('/')
            } else {
                setError('Invalid response from server')
            }
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false);
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
        <div className='bg-zinc-950 text-white p-4 w-full h-[88.1vh] flex justify-center items-center'>
            <form onSubmit={handleSubmit(loginHandler)} className='border-2 border-zinc-700 rounded-lg py-3 px-2 shadow-lg shadow-white/20 w-full max-w-md'>
                <h1 className='py-3 px-2 font-bold text-xl text-center'>Welcome Back!</h1>
                {error && (
                    <div className='bg-red-500/20 border border-red-500 text-red-500 px-4 py-2 rounded-lg mx-2 mb-4'>
                        {error}
                    </div>
                )}
                <div className='flex flex-col items-center py-3 px-2 gap-3'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label className='px-1' htmlFor="email">email:</label>
                        <input
                            {...register("email", {
                                required: "email is required"
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1 focus:outline-none focus:border-white transition-colors' 
                            id="email" 
                            name="email" 
                            placeholder="Enter your email" 
                        />
                        {errors.username && (
                            <span className='text-red-500 text-sm'>{errors.username.message}</span>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label className='px-1' htmlFor="password">Password:</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1 focus:outline-none focus:border-white transition-colors' 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter your password" 
                        />
                        {errors.password && (
                            <span className='text-red-500 text-sm'>{errors.password.message}</span>
                        )}
                    </div>
                    <button 
                        type='submit' 
                        className='bg-white text-black hover:bg-zinc-200 border-2 rounded-2xl px-4 py-2 font-semibold w-full transition-colors'
                    >
                        Login
                    </button>
                </div>
                <p className="mt-4 text-center text-base text-zinc-400">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/register"
                        className="font-medium text-white hover:text-zinc-300 transition-colors"
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login
