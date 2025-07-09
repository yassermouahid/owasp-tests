const owasp_home_page_locators = require('../locators/owasp_home.json')
const owasp_store_locators = require('../locators/owasp_store.json')

describe('Add to cart', () => {
  it.skip('should add to cart successfully', () => {
    cy.visit('/')

    cy.get(owasp_home_page_locators.store_button).eq(0).click()
    cy.task('log', 'Clicked Store button')

    cy.origin(
      'https://www.zazzle.com/store/owasp_foundation/products',
      {
        args: {
          owasp_store_locators: owasp_store_locators,
        },
      },
      ({ owasp_store_locators }) => {
        cy.on('uncaught:exception', () => false)

        cy.task('log', 'Capturing product name from first product')
        cy.get(owasp_store_locators.first_product_name)
          .invoke('text')
          .then((text) => {
            const trimmedText = text.trim()
            cy.task('log', `Captured product name: ${trimmedText}`)
            cy.wrap(trimmedText).as('productName')
          })
        cy.get(owasp_store_locators.first_product_name).click()
        cy.task('log', 'Clicked on first product')
        cy.get(owasp_store_locators.add_to_cart_button).click()
        cy.task('log', 'Clicked Add to Cart button')
        cy.get('.Drawer_drawer_top').contains('Just added to your cart!')
        cy.task('log', 'Checked add to cart confirmation message')
        cy.get('@productName').then((productName) => {
          cy.get('.AddedToCartDesktopContent-productTitle').should(
            'contain.text',
            productName,
          )
          cy.task('log', `Verified cart contains product: ${productName}`)
        })
      },
    )
  })
})
