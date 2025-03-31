import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Createpost from './pages/Createpost.jsx'
import UserProfile from './pages/UserProfile.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'
import Profile from './pages/Profile.jsx'
import Followers from './pages/Followers.jsx'
import Following from './pages/Following.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Signup />
      },
      {
        path: '/add-post',
        element: <Createpost />
      },
      {
        path: '/profile',
        element: <UserProfile/>
      },
      {
        path: '/update-profile',
        element: <UpdateProfile/>
      },
      {
        path: '/profile/:username',
        element: <Profile />
      },
      {
        path: '/profile/:username/followers',
        element: <Followers/>
      },
      {
        path: '/profile/:username/followings',
        element: <Following/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
