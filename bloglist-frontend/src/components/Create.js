import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, removeNotification } from '../features/notification/notificationSlice'
import { createBlog as _createBlogs } from '../features/blogs/blogsSlice'
import blogService from '../services/blogs'
import { Button, CardActions, CardContent, TextField, Typography } from '@mui/material'

const Create = ({ user }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    createBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const createBlog = async (title, author, url) => {
    try {
      const returnedBlog = await blogService.create(
        title,
        author,
        url,
        user.token
      )
      returnedBlog.user = user
      dispatch(_createBlogs(returnedBlog))
      dispatch(setNotification(
        {
          state: 'success',
          message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        }
      ))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleCreate}>
      <CardContent>
        <Typography>Create new</Typography>
        <div>
          <TextField fullWidth sx={{ mt: 1 }} label='Title' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <TextField fullWidth sx={{ mt: 1 }} label='Author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <TextField fullWidth sx={{ mt: 1 }} label='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
      </CardContent >
      <CardActions>
        <Button fullWidth variant="contained" type='submit'>create</Button>
      </CardActions>
    </form>

  )
}

export default Create
