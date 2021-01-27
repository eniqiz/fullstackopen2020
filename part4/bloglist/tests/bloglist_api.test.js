const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is https://reactpatterns.com/', async () => {
    const response = await api.get('/api/blogs')

    const urls = response.body.map(r => r.url)
    expect(urls).toContain('https://reactpatterns.com/')
  })

  test('check blog has id property', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('add blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'new test blog',
      author: 'alice',
      url: 'http://example.com',
      likes: 20
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const urls = blogsAtEnd.map(r => r.url)
    expect(urls).toContain('http://example.com')
  })

  test('property likes equals 0 if request does not contain it', async () => {
    const newBlog = {
      title: 'test blog without likes',
      author: 'bob',
      url: 'http://example.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogWithoutLikes = response.body.filter(r => r.title === 'test blog without likes')
    expect(blogWithoutLikes[0].likes).toBeDefined()
    expect(blogWithoutLikes[0].likes).toEqual(0)
  })

  test('response 400 if post request does not have title and url', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      author: 'bob',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toEqual(blogsAtStart)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const urls = blogsAtEnd.map(blog => blog.url)
    expect(urls).not.toContain(blogToDelete.url)
  })
})

describe('update likes of a blog', () => {
  test('update likes of React patterns to 100', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let blogToUpdate = blogsAtStart.filter(b => b.title === 'React patterns')[0]
    blogToUpdate.likes = 100

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const blogToCheck = blogsAtEnd.filter(b => b.title === 'React patterns')
    expect(blogToCheck[0].likes).toEqual(100)
  })
})

afterAll(() => {
  mongoose.connection.close()
})