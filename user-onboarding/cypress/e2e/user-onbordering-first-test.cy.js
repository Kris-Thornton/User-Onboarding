describe('My First Test', () => {
  it('User OnBordering', () => {
    cy.visit('http://localhost:3000/')

    cy.get('input[name=firstname]').type('Kris')

    cy.get('input[name=lastname]').type('Thornton')

    cy.get('input[name=email]').type('Kristhornton@ymail')

    cy.get('input[name=password]').type('funnypassword')

    cy.get('input[name=agree]').click()

    cy.get('button').click()
    
    cy.get('form').invoke('val', '')

    // cy.contains('type').click()

    // cy.url().should('include', '/commands/actions')

    // cy.get('.action-email').type('fake@email.com')

    // cy.get('.action-email').should('have.value', 'fake@email.com')
  })
})