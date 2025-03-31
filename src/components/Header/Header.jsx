import React, { useState } from 'react'
import '../../App.css'
import { useDispatch } from 'react-redux'
import { Container } from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../services/authService'
import { logout } from '../../store/authSlice'
import logo from '../../assets/icons8-v-64.png'


function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const logoutHandler = async () => {
        setError('')
        setLoading(true);
        try {
            const userdata = await authService.logoutService()
            console.log(userdata)
            navigate('/')
            dispatch(logout(userdata));
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false); // Reset loading state
        }
    }
    const searchProfile = async (username) => {
        setError('')
        setLoading(true);
        try {
            navigate(`/profile/${username}`);
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false); // Reset loading state
        }
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        const username = e.target.elements.username.value; // Get the username from the input
        searchProfile(username); // Call the searchProfile function
    };

    const navItems = [
        {
            name: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M8.9995 22L8.74887 18.4911C8.61412 16.6046 10.1082 15 11.9995 15C13.8908 15 15.3849 16.6046 15.2501 18.4911L14.9995 22" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>),
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>),
            slug: '/add-post',
            active: authStatus
        },
        {
            name: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>),
            slug: '/profile',
            active: authStatus
        }
    ]
    return (
        <header className='bg-zinc-950 text-white border-b-2 border-zinc-700 sticky top-0'>
            <Container>
                <nav className='flex justify-between px-4 py-1 '>
                    <div>
                        <Link to='/'>
                            <img 
                                className='w-14 rounded-full hover:shadow-md hover:shadow-white/5 max-md:w-10' 
                                src={logo}
                                alt="VibeHive Logo"
                            />
                        </Link>
                    </div>
                    <div className='flex items-center '>
                        <form onSubmit={handleSearchSubmit} className='flex items-center gap-2 '>
                            <input name='username' className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="text" placeholder='Search...' />
                            <button type='submit'>
                                <svg className='cursor-pointer hover:text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#525b56" fill="none">
                                    <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <ul className='flex items-center gap-6 font-semibold'>
                        {navItems.map((item, index) =>
                            item.active ? (
                                <li onClick={() => navigate(item.slug)} className='max-md:hidden cursor-pointer border-zinc-200 hover:bg-zinc-200 hover:text-black border-2 rounded-2xl px-2 py-1' key={index}>
                                    {item.name}
                                </li>
                            ) : null
                        )}
                        {authStatus ? (
                            <li className='cursor-pointer border-zinc-200 hover:bg-zinc-200 hover:text-black border-2 rounded-2xl px-2 py-1 max-md:hidden'>
                                <button onClick={logoutHandler} disabled={loading}>
                                    {loading ? 'Logging out...' : (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                        <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>)}
                                </button>
                            </li>
                        ) : null}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
