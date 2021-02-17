import { func } from "prop-types"

describe('Blog app', function() {
  beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
          name: 'Example',
          username: 'example',
          password: 'secret'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
      cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('example')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Example logged-in')
    })
  
    it('fails with wrong credentials', function() {
      cy.get('#username').type('example')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'example', password: 'secret' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('newblog')
      cy.get('#author').type('newauthor')
      cy.get('#url').type('newurl')
      cy.get('#create-blog').click()

      cy.contains('a new blog newblog by newauthor added')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('newblog')
      cy.get('#author').type('newauthor')
      cy.get('#url').type('newurl')
      cy.get('#create-blog').click()

      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('newblog-1')
      cy.get('#author').type('newauthor-1')
      cy.get('#url').type('newurl-1')
      cy.get('#create-blog').click()

      cy.wait(5000)

      cy.get('button').contains('new blog').click()
      cy.get('#title').type('newblog-2')
      cy.get('#author').type('newauthor-2')
      cy.get('#url').type('newurl-2')
      cy.get('#create-blog').click()

      cy.wait(5000)

      cy.contains('newblog-1 newauthor-1').contains('view').click()
      cy.get('button').contains('remove').click()

      cy.get('.blog').should('not.contain', 'newblog-1')
      cy.get('.blog').should('contain', 'newblog-2')
    })

    it('list blog in the order of likes', function() {
      cy.createBlog({ title: 'newblog-1', author: 'newauthor-1', url: 'newurl-1', likes: 1 })
      cy.createBlog({ title: 'newblog-2', author: 'newauthor-2', url: 'newurl-2', likes: 5 })
      cy.createBlog({ title: 'newblog-3', author: 'newauthor-3', url: 'newurl-3', likes: 10 })

      cy.reload()
      cy.get('.blog').eq(0).should('contain', 'newblog-3')
      cy.get('.blog').eq(1).should('contain', 'newblog-2')
      cy.get('.blog').eq(2).should('contain', 'newblog-1')
    })
  })
})