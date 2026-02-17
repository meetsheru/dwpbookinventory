
module.exports = {
  timeout: 30000,
  workers: 1,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    headless: false,
    baseURL: 'https://frontendui-librarysystem.onrender.com'
  },
};
