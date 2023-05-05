import { useDispatch } from 'react-redux'
import { removeUser } from '../features/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'

const Header = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(removeUser())
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div>
      <AppBar position="fixed">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Toolbar>
            <Typography variant="h6" sx={{
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}>
              BlogList
            </Typography>
          </Toolbar>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='menu'>
            </IconButton>
            <Button color='inherit' component={Link} to='/' >
              blogs
            </Button>
            <Button color='inherit' component={Link} to='/users' >
              users
            </Button>
            {user === null ?
              <Button color='inherit' component={Link} to='/login' >
                login
              </Button>
              : <>
                <Button color='inherit' onClick={() => navigate(`/users/${user.id}`)} >Me</Button>
                <Button color='inherit' onClick={() => logout()}>logout</Button>
              </>
            }
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  )
}

export default Header
