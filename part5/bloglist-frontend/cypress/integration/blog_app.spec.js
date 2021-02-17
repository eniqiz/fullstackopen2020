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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('example')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
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
  })
})