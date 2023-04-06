const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Todo Task API',
        version: '1.0.0',
        description: 'API documentation for the Todo Task API',
        contact: {
          name: 'Urmi',
          url: 'https://your-website.com',
          email: 'urmic125@gmail.com'
        }
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ]
    },
    apis: ['./routes/*.js']
  };
  
  module.exports = swaggerOptions;
  