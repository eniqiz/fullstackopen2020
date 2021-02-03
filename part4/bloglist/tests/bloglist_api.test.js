const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const userObjects = helper.initialUsers.map(user => new User(user))
  const promiseArrayUser = userObjects.map(user => user.save())
  await Promise.all(promiseArrayUser)

  const userAdded = await User.findOne({ username: 'example' })

  const blogObjects = helper.initialBlogs.map(blog => {
    const blogToAdd = new Blog(blog)
    blogToAdd.user = userAdded._id
    return blogToAdd
  })
  const promiseArrayBlog = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArrayBlog)

  const query = await Blog.find({})
  let blogIds = []
  for (let b of query) {
    blogIds = blogIds.concat(b._id)
  }
  await User.findOneAndUpdate({ username: 'example' }, { blogs: blogIds })
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

let jwtString = ''
describe('add blogs', () => {
  beforeEach(async () => {
    await api
      .post('/api/login')
      .send({
        'username': 'example',
        'password': 'secret'
      })
      .then(response => jwtString = response.body.token)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'new test blog',
      author: 'alice',
      url: 'http://example.com',
      likes: 20
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + jwtString)
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
      .set('Authorization', 'bearer ' + jwtString)
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
      .set('Authorization', 'bearer ' + jwtString)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toEqual(blogsAtStart)
  })
})

describe('deletion of a blog', () => {
  beforeEach(async () => {
    await api
      .post('/api/login')
      .send({
        'username': 'example',
        'password': 'secret'
      })
      .expect(200)
      .then(response => jwtString = response.body.token)
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer ' + jwtString)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const urls = blogsAtEnd.map(blog => blog.url)
    expect(urls).not.toContain(blogToDelete.url)
  })
})

describe('update likes of a blog', () => {
  beforeEach(async () => {
    await api
      .post('/api/login')
      .send({
        'username': 'example',
        'password': 'secret'
      })
      .expect(200)
      .then(response => jwtString = response.body.token)
  })

  test('update likes of React patterns to 100', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let blogToUpdate = blogsAtStart.filter(b => b.title === 'React patterns')[0]
    blogToUpdate.likes = 100

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', 'bearer ' + jwtString)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const blogToCheck = blogsAtEnd.filter(b => b.title === 'React patterns')
    expect(blogToCheck[0].likes).toEqual(100)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'alice',
      name: 'Alice Ace',
      password: 'goodpasswd',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Root',
      password: 'secret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'qa',
      name: 'Root',
      password: 'secret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('shorter than the minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root1',
      name: 'Root',
      password: 'se',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})