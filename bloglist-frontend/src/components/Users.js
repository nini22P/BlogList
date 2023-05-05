import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../features/users/usersSlice'
import usersService from '../services/users'
import { Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  // console.log('get users from state', users)

  useEffect(() => {
    usersService.getAll().then((users) => {
      dispatch(setUsers(users))
      // return console.log('get users from api', users)
    })
  }, [dispatch])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Blogs created</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            users.map((user) => <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.blogs.length}</TableCell>
              <TableCell>
                <Button component={Link} href={`/users/${user.id}`}>View</Button>
              </TableCell>
            </TableRow>)
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users