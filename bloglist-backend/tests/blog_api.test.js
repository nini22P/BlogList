const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initiaBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initiaBlogs.length)
})

test('id is renamed', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('add a blog and get it', async () => {
    const addResponse = await api
        .post('/api/blogs')
        .send(helper.inintaBlog)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

    const addreturnedObject = addResponse.body
    const addreturnedObjectId = addreturnedObject.id
    delete addreturnedObject.id
    expect(addreturnedObject).toEqual(helper.inintaBlog)
    const getResponse = await api.get(`/api/blogs/${addreturnedObjectId}`)
    const getreturnedObject = getResponse.body
    delete getreturnedObject.id
    expect(getreturnedObject).toEqual(addreturnedObject)

})

test('add a blog with no likes', async () => {
    const response = await api
        .post('/api/blogs')
        .send(helper.noLikesBlog)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    expect(response.body.likes === 0)
})

test('add a blog with no title and url', async () => {
    await api
        .post('/api/blogs')
        .send(helper.noTitleAndUrl)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
})

test('add a blog and delete blog with id', async () => {
    const response = await api
        .post('/api/blogs')
        .send(helper.blogWithId)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

    await api
        .delete(`/api/blogs/${response.body.id}`)
        .expect(204)
})

test('add a blog and update a blog', async () => {

    const responseAdd = await api
        .post('/api/blogs')
        .send(helper.blogWithId)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

    const responseUpdate = await api
        .put(`/api/blogs/${responseAdd.body.id}`)
        .send(helper.updatedBlog)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    helper.updatedBlog.id = responseAdd.body.id
    expect(responseUpdate.body).toEqual(helper.updatedBlog)
})

afterAll(() => {
    mongoose.connection.close()
})