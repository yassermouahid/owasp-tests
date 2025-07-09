const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')

module.exports = {
  retries: {
    runMode: 1,
  },
  chromeWebSecurity: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  watchForFileChanges: false,
  video: false,
  defaultCommandTimeout: 15000,
  responseTimeout: 15000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    overwrite: false,
    html: true,
    json: true,
    reportDir: 'cypress/reports/html',
    reportFilename: `report_${dayjs().format('YYYY-MM-DD_HH-mm-ss')}`,
  },
  e2e: {
    baseUrl: 'https://owasp.org/www-project-juice-shop/',
    supportFile: 'cypress/support/e2e.js',
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // Set up Mochawesome reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on)

      // Define custom tasks
      on('task', {
        initializeFileIfEmpty({ fileName }) {
          const filePath = path.join(
            config.fixturesFolder,
            'generated_fixtures',
            fileName,
          )

          if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath)
            if (stats.size === 0) {
              fs.writeFileSync(filePath, JSON.stringify({}))
              return null
            }
          } else {
            fs.writeFileSync(filePath, JSON.stringify({}))
            return null
          }
          return null
        },

        log: (param) => {
          const spaces = '   LOG: '
          const formattedParam = Array.isArray(param) ? param : [param]
          const spacedParam = formattedParam.map((item) => `${spaces}${item}`)

          console.log(...spacedParam)
          return true
        },
      })
    },
  },
}
