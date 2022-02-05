const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogit = []

  const result = listHelper.dummy(blogit)
  expect(result).toBe(1)
})

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('total likes', () => {

  const reducer = (accumulator, currentValue) => accumulator + currentValue

  test('when list of blogs equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs)
    const likesMap = blogs.map(x => x.likes)
    console.log(result)
    expect(result).toBe(likesMap.reduce(reducer))
  })
})

describe('favorite blog', () => {

  const reducer = (accumulator, currentValue) => accumulator + currentValue

  test('when list of blogs equals the likes of that', () => {
    const result = listHelper.favoriteBlog(blogs)
    const likesMap = blogs.map(x => x.likes)
    const likesSort = likesMap.sort(function(a, b){return b-a})
    const idx = likesMap.indexOf(likesSort[0])

    console.log(blogs[idx])
    expect(result).toEqual(blogs[idx])
  })
})