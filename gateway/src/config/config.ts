export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  authService: {
    url: process.env.AUTH_SERVICE_URL || 'http://localhost:8080',
  },
});
