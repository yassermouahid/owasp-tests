const owasp_home_page_locators = require('../locators/owasp_home.json')
const owasp_foundation_home_page_locators = require('../locators/owasp_foundation_home.json')
const owasp_registration_page_locators = require('../locators/owasp_registration.json')

describe('Registration Flow', () => {
  it('should register successfully', () => {
    cy.visit('/')
    cy.get(owasp_home_page_locators.join_button).eq(0).click()
    cy.task('log', 'Clicked Join button')

    cy.generateEmail().then((generated_email) => {
      cy.generatePassword().then((generated_password) => {
        cy.generateName().then((firstname) => {
          cy.generateName().then((lastname) => {
            cy.origin(
              'https://owasp.glueup.com',
              {
                args: {
                  owasp_foundation_locators:
                    owasp_foundation_home_page_locators,
                  registration_locators: owasp_registration_page_locators,
                  generated_email,
                  generated_password,
                  firstname,
                  lastname,
                },
              },
              ({
                owasp_foundation_locators,
                registration_locators,
                generated_email,
                generated_password,
                firstname,
                lastname,
              }) => {
                cy.on('uncaught:exception', () => false)

                cy.get(owasp_foundation_locators.login_button).click()
                cy.task('log', 'Clicked header login button')

                cy.get(owasp_foundation_locators.signup_link).click()
                cy.task('log', 'Clicked signup link')

                cy.get(registration_locators.registration_email_input)
                  .eq(0)
                  .type(generated_email, { force: true })
                cy.task('log', 'Inserted email')

                cy.get(
                  registration_locators.registration_policy_checkbox,
                ).click({ force: true })
                cy.task('log', 'Policy checkbox checked')

                cy.get(registration_locators.registration_submit_button).click()
                cy.task('log', 'Clicked registration submit button')

                cy.get(registration_locators.registration_firstname_input).type(
                  firstname,
                )
                cy.task('log', 'Inserted firstname')

                cy.get(registration_locators.registration_lastname_input).type(
                  lastname,
                )
                cy.task('log', 'Inserted lastname')

                cy.get(registration_locators.registration_password_input).type(
                  generated_password,
                )
                cy.task('log', 'Inserted password')

                cy.get(
                  registration_locators.registration_policy_checkbox,
                ).click({ force: true })
                cy.task('log', 'Policy checkbox checked')
              },
            )
          })
        })
      })
    })
  })
})
