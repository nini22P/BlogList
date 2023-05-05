import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { setUser } from '../features/user/userSlice'
import { setNotification, removeNotification } from '../features/notification/notificationSlice'
import { TextField, Button, Card, CardContent, Typography, CardActions } from '@mui/material'
import loginService from '../services/login'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      dispatch(setUser(user))
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/')
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error.response.data.error)
      dispatch(setNotification({ state: 'error', message: error.response.data.error }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  return (
    <div>
      <Card sx={{ maxWidth: 460, margin: 'auto' }} >
        <form onSubmit={handleLogin}>
          <CardContent>
            <Typography>
              Log in to application
            </Typography>
            <div>
              <TextField fullWidth sx={{ mt: 1 }} label='username' value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
              <TextField fullWidth sx={{ mt: 1 }} label='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
          </CardContent>
          <CardActions sx={{ pl: 2, pr: 2, pb: 2 }} >
            <Button fullWidth variant="contained" color="primary" sx={{ mr: 1 }} component={Link} to={'/register'} >
              Register
            </Button>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Login
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

export default Login
