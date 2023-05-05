describe('Blog list', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'sato',
      name: 'Sato Yuri',
      password: '114514',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Blogs')
    cy.contains('Log in to application')
  })

  describe('User login', () => {
    it('Successful login', () => {
      cy.get('#username').type('sato')
      cy.get('#password').type('114514')
      cy.get('#login-button').click()
      cy.contains('Sato Yuri logged in')
    })

    it('Failed login', () => {
      cy.get('#username').type('sato')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When user logged in', () => {
    beforeEach(() => {
      cy.get('#username').type('sato')
      cy.get('#password').type('114514')
      cy.get('#login-button').click()
      cy.contains('Sato Yuri logged in')
    })

    it('Successfully create a blog', () => {
      cy.contains('new blog').click()
      cy.get('#titleInput').type('Sato\'s Blog')
      cy.get('#authorInput').type('Sato Yuri')
      cy.get('#urlInput').type('http://sato.blog')
      cy.contains('create').click()
      cy.contains('a new blog Sato\'s Blog by Sato Yuri added')
      cy.contains('Sato\'s Blog Sato Yuri')
    })
  })

  describe('When user logged in and Successfully create a blog', () => {
    beforeEach(() => {
      // login
      cy.get('#username').type('sato')
      cy.get('#password').type('114514')
      cy.get('#login-button').click()
      cy.contains('Sato Yuri logged in')
      // create a new blog
      cy.get('#toggleButton').click()
      cy.get('#titleInput').type('Sato\'s Blog')
      cy.get('#authorInput').type('Sato Yuri')
      cy.get('#urlInput').type('http://sato.blog')
      cy.contains('create').click()
      cy.contains('a new blog Sato\'s Blog by Sato Yuri added')
    })

    it('Users can like a blog', () => {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('User can remove a blog', () => {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('Sato\'s Blog Sato Yuri').should('not.exist')
    })
  })

  describe('When user logged in and Successfully create two blog', () => {
    beforeEach(() => {
      // login
      cy.get('#username').type('sato')
      cy.get('#password').type('114514')
      cy.get('#login-button').click()
      cy.contains('Sato Yuri logged in')
      // create First blog
      cy.get('#toggleButton').click()
      cy.get('#titleInput').type('First Blog')
      cy.get('#authorInput').type('First')
      cy.get('#urlInput').type('http://first.blog')
      cy.contains('create').click()
      cy.contains('a new blog First Blog by First added')
      // create Second blog
      cy.get('#toggleButton').click()
      cy.get('#titleInput').type('Second Blog')
      cy.get('#authorInput').type('Second')
      cy.get('#urlInput').type('http://second.blog')
      cy.contains('create').click()
      cy.contains('a new blog Second Blog by Second added')
    })

    it('like more blogs at the front', () => {
      cy.get('.blog').eq(0).should('contain', 'First Blog')
      cy.get('.blog').eq(1).should('contain', 'Second Blog')

      cy.get('.blogToggleButton').eq(1).click()
      cy.get('.likeButton').eq(1).click()

      cy.get('.blog').eq(0).should('contain', 'Second Blog')
      cy.get('.blog').eq(1).should('contain', 'First Blog')
    })
  })
})
