const owasp_home_page_locators = require('../locators/owasp_home.json')
const owasp_foundation_home_page_locators = require('../locators/owasp_foundation_home.json')

describe('User Login', () => {
  let expected_data

  before(() => {
    cy.fixture('login_expected_data').then((data) => {
      expected_data = data
    })
  })

  it('should login successfully', () => {
    cy.visit('/')
    cy.get(owasp_home_page_locators.join_button).eq(0).click()

    cy.origin(
      'https://owasp.glueup.com',
      {
        args: {
          owasp_foundation_locators: owasp_foundation_home_page_locators,
          expected_data,
        },
      },
      ({ owasp_foundation_locators, expected_data }) => {
        const email = Cypress.env('email')
        const password = Cypress.env('password')
        cy.on('uncaught:exception', () => false)
        cy.get(owasp_foundation_locators.login_button).click()
        cy.task('log', 'Clicked login button')

        cy.get(owasp_foundation_locators.login_email_input).type(email)
        cy.task('log', 'Insterted email')

        cy.get(owasp_foundation_locators.login_password_input).type(password)
        cy.task('log', 'Inserted password')

        cy.get(owasp_foundation_locators.login_submit_button).click()
        cy.task('log', 'Clicked login submit button')

        cy.get(owasp_foundation_locators.welcome_message_label)
          .contains(expected_data.welcome_text)
          .should('be.visible')
        cy.task('log', 'Welcome message is displayed')
      },
    )
  })
})
