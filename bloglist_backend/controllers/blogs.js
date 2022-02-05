/* eslint-disable linebreak-style */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Routejen määrittely
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

// Apufunktio getTokenFrom eristää tokenin headerista authorization
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// Uuden blogin julkaisu
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  // Tokenin oikeellisuus varmistetaan metodilla verify
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(200).json(savedBlog.toJSON())
})

// Poistaminen
blogsRouter.delete('/:id', async (request, response) => {
  console.log('in')
  const token = getTokenFrom(request)
  // Tokenin oikeellisuus varmistetaan metodilla verify
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log('jwt ohi')

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const userid = user._id
  // Etsitään poistettava blogi
  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() === userid.toString() ) {
    blog.remove()
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'token missing or invalid user' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)
  // Tokenin oikeellisuus varmistetaan metodilla verify
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  }

  const updatedBlog = await Blog
  .findByIdAndUpdate(request.params.id, blog, { new: true })

  if (updatedBlog) {
    response.json(updatedBlog.toJSON())
  } else {
    response.status(404).end()
  }
})


module.exports = blogsRouter