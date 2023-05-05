import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification, removeNotification } from '../features/notification/notificationSlice'
import { TextField, Button, Card, CardContent, Typography, CardActions } from '@mui/material'
import userService from '../services/users'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const user = await userService.register(username, name, password)
      if (user.id !== null) {
        dispatch(setNotification({ state: 'success', message: 'Register success, please login' }))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000)
        setUsername('')
        setName('')
        setPassword('')
        navigate('/login')
      }
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
        <form onSubmit={handleRegister}>
          <CardContent>
            <Typography>
              Register to application
            </Typography>
            <div>
              <TextField fullWidth sx={{ mt: 1 }} label='username' value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
              <TextField fullWidth sx={{ mt: 1 }} label='name' value={name} onChange={({ target }) => setName(target.value)} />
            </div>
            <div>
              <TextField fullWidth sx={{ mt: 1 }} label='password' value={password} type='password' onChange={({ target }) => setPassword(target.value)} />
            </div>
          </CardContent>
          <CardActions sx={{ pl: 2, pr: 2, pb: 2 }} >
            <Button fullWidth variant="contained" color="primary" sx={{ mr: 1 }} component={Link} to={'/login'} >
              Login
            </Button>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Confirm Register
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

export default Register