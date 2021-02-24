const _ = require('lodash')

// eslint-disable-next-line
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentBlog) => accumulator + currentBlog.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let blogWithMostLikes = { likes: 0 }
  blogs.forEach(element => {
    if (element.likes >= blogWithMostLikes.likes) {
      blogWithMostLikes = element
    }
  })
  return {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  }
}

const mostBlog = (blogs) => {
  let all = _.mapValues(_.groupBy(blogs, 'author'), (o) => o.length)
  let author = _.findKey(all, (o) => o === _(all).values().max())
  return {
    author: author,
    blogs: all[author]
  }
}

const mostLikes = (blogs) => {
  const reducer = (accumulator, currentAuthor) => accumulator + currentAuthor.likes
  let all = _.mapValues(_.groupBy(blogs, 'author'), (o) => o.reduce(reducer, 0))
  let author = _.findKey(all, (o) => o === _(all).values().max())
  return {
    author: author,
    likes: all[author]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
}