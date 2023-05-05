const User = require('../models/user')
const initiaBlogs = require('../test.blogs.json')

const inintaBlog = {
    title: "Tom",
    author: "Sam",
    url: "http://blog.tom.html",
    likes: 2
}

const noLikesBlog = {
    itle: "Tom",
    author: "Sam",
    url: "http://blog.tom.html",
}

const noTitleAndUrl = {
    author: "Sam",
    likes: 4
}

const blogWithId = {
    id: "114514",
    title: "Tom",
    author: "Sam",
    url: "http://blog.tom.html",
    likes: 2
}

const updatedBlog = {
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com/",
    "likes": 9
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}


module.exports = {
    initiaBlogs,
    inintaBlog,
    noLikesBlog,
    noTitleAndUrl,
    blogWithId,
    updatedBlog,
    usersInDb,
}