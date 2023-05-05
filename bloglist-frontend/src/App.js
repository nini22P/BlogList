import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { setUser } from './features/user/userSlice'
import { Container } from '@mui/material'
import Header from './components/Header'
import Notification from './components/Notification'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Register from './components/Register'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const localUser = localStorage.getItem('user')
    // console.log('get user storage local', localUser)
    if (localUser !== null) {
      dispatch(setUser(JSON.parse(localUser)))
    }
  }, [dispatch])

  const user = useSelector(state => state.user)
  // console.log('get user from state', user)

  return (
    <Container space=''>
      <Router>
        <Header user={user} />
        <Container sx={{ pt: 12 }}>
          <Notification />
          <Routes>
            <Route path='/' element={<Blogs user={user} />} />
            <Route path='/blogs/:id' element={<Blog user={user} />} />
            <Route path='/users' element={user === null ? <Navigate replace to='/login' /> : <Users />} />
            <Route path='/users/:id' element={<User user={user} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/*' element={<Navigate replace to='/' />} /> */}
          </Routes>
        </Container>
      </Router>
    </Container>
  )
}

export default App
