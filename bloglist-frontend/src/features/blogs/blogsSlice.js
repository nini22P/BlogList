import { createSlice } from '@reduxjs/toolkit'

const blogsSort = blogs => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

export const blogsSlice = createSlice({
  name: 'blogsSlice',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return blogsSort(action.payload)
    },
    createBlog: (state, action) => {
      state.push(action.payload)
    },
    likeBlog: (state, action) => {
      const newBlog = {
        ...action.payload,
        likes: action.payload.likes + 1,
      }
      return blogsSort(
        state.filter((blog) => blog.id !== action.payload.id)
          .concat(newBlog))
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload.id)
    }
  }
})

export const { setBlogs, createBlog, likeBlog, removeBlog } = blogsSlice.actions

export default blogsSlice.reducer