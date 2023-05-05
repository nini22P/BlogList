import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { setUsers } from '../features/users/usersSlice'
import usersService from '../services/users'
import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'


const User = ({ user }) => {
  const dispatch = useDispatch()
  const id = useParams().id

  useEffect(() => {
    usersService.getAll().then((users) => {
      dispatch(setUsers(users))
      // return console.log('get users from api', users)
    })
  }, [dispatch])

  const users = useSelector(state => state.users)
  // console.log('get users from state', users)
  const creater = users.find(x => x.id === id)
  // console.log(creater)

  if (!user || !creater)
    return null
  return (
    <Card>
      <Typography variant="h5" sx={{ p: 2 }}>{creater.name}</Typography>

      <List>
        {creater.blogs.map((blog) => (
          <div key={blog.id} >
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/blogs/${blog.id}`}  >
                <ListItemText primary={blog.title} />
              </ListItemButton>

            </ListItem>

          </div>
        ))}
      </List>
    </Card>
  )
}

export default User