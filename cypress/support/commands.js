const { faker } = require('@faker-js/faker')
const owasp_foundation_home_page_locators = require('../locators/owasp_foundation_home.json')

Cypress.Commands.add('generateEmail', (prefix = 'owasp-test') => {
  const randomStr = faker.string.alphanumeric(6).toLowerCase()
  return `${prefix}.${randomStr}@owasp.com`
})

Cypress.Commands.add('generatePassword', (length = 16) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&'
  const specialChars = '@$!%*?&'
  let password = specialChars.charAt(
    Math.floor(Math.random() * specialChars.length),
  )
  for (let i = 1; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  password = password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('')

  return password
})

Cypress.Commands.add('generateName', () => {
  const name = faker.person.firstName()
  return cy.wrap(name)
})
