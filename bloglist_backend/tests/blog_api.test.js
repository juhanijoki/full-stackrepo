const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// GET-testaus
test('all blogs returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContainEqual(
    'Pienen pojan elämää'
  )
})
// POST-testaus
test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Lihaa ja perunaa",
    author: "popeda",
    url: "https://lihaajaperunaa.fi/",
    likes: 30
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContainEqual(
    'Lihaa ja perunaa'
  )
})

test('a valid user can be added', async () => {
  const newUser = {
    username: "Pekka Töpöhäntä",
    name: "Pekka",
    password: "kissa"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')

  const usernames = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialUsers.length + 1)
  expect(usernames).toContainEqual(
    'Pekka Töpöhäntä'
  )
})

afterAll(() => {
    mongoose.connection.close()
  })