import './commands'
import 'cypress-mochawesome-reporter/register'

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore *all* uncaught exceptions and prevent test failures
  return false
})
