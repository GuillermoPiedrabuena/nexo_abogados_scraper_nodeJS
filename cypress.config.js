const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    screenshotOnRunFailure: false,
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
