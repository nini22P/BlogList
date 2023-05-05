import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../features/blogs/blogsSlice'
import blogService from '../services/blogs'
import Create from './Create'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Paper, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const togglableRef = useRef(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs))
      // console.log('get blogs from api', blogs)
    })
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  // console.log('get blogs from state', blogs)

  return (
    <div>
      {user !== null && <Accordion sx={{ mb: 2, borderRadius: 1 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Create New Blog</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Create
            toggleVisiblity={() => togglableRef.current.toggleVisiblity()}
            user={user}
          />
        </AccordionDetails>
      </Accordion>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell >{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.likes}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/blogs/${blog.id}`} >View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs
