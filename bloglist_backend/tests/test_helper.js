const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: "Pienen pojan elämää",
    author: "Klamydia",
    url: "https://blogit.fi/",
    likes: 43
  },
  {
    title: "Lonely boy",
    author: "Black keys",
    url: "https://blackkeys.com/",
    likes: 78
  },
]

const initialUsers = [
  {
    username: "Ismo Laitela",
    name: "Ipi",
    password: "pesäpallomaila"
  },
  
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  usersInDb,
  initialUsers
}