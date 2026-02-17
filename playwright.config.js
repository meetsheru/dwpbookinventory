
module.exports = {
  timeout: 30000,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    headless: false,
    slowMo: 500,
    baseURL: 'https://frontendui-librarysystem.onrender.com'
  },
};
