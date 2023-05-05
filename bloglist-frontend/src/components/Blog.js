import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import { Button, Card, CardActions, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const Blog = ({ user }) => {
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const id = useParams().id

  useEffect(() => {
    blogService.getById(id).then((blog) =>
      setBlog(blog)
    )
  }, [])

  const handleLike = async (blog) => {
    try {
      await blogService.update(
        blog.id,
        blog.title,
        blog.author,
        blog.likes + 1,
        blog.url,
        blog.user.id
      )
      setBlog({
        ...blog,
        likes: blog.likes + 1
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemove = async (blog) => {
    try {
      await blogService.remove(blog.id)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const isCreateUser = (blog, user) => {
    if (!user)
      return false
    return blog.user === user.id
  }

  if (!blog)
    return null

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>
          {blog.title}
        </Typography>
        <Typography variant='body1'>
          Link: <a href={`${blog.url}`}>{blog.url}</a>
        </Typography>
        <Typography variant='body1'>
          likes: {blog.likes}
        </Typography>
        <Typography>
          Author: {blog.author}
        </Typography>
      </CardContent>
      <CardActions>
        {
          (isCreateUser(blog, user))
          &&
          <div>
            <Button aria-label="Remove" startIcon={<DeleteOutlineIcon />} onClick={() => handleClickOpen()} >
              remove
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Remove blog
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {`Delete blog ${blog.title} by ${blog.author}`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={
                  () => handleRemove(blog)
                } autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }
        <Button
          aria-label="Like"
          startIcon={<FavoriteBorderIcon />}
          onClick={() => handleLike(blog)}>
          Like
        </Button>
      </CardActions>
    </Card>
  )
}

export default Blog
