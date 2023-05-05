const listHelper = require('../utils/list_helper')
const blogList = require('../test.blogs.json')

test('dummy return one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('total likes in blog list', () => {
        const result = listHelper.totalLikes(blogList)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {

    test('favorite blog in blog list', () => {
        const result = listHelper.favoriteBlog(blogList)

        expect(result).toEqual(
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            }
        )
    })
})