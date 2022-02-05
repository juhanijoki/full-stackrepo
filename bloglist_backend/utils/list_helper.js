const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    // Map-komennolla lista likejen määristä
    const likesList = blogs.map(x => x.likes)
    console.log(likesList)

    return likesList.reduce(reducer)
}

const favoriteBlog = (blogs) => {
  const likesList = blogs.map(x => x.likes)
  const listSort = likesList.sort(function(a, b){return b-a})
  const idx = likesList.indexOf(listSort[0])
  console.log(listSort)

  return blogs[idx]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}