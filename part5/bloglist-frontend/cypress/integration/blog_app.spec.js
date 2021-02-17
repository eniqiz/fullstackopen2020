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
      cy.visit('http://localhost:3000')
      cy.contains('Log in to application')
  })
})