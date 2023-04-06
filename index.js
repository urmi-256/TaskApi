// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require("dotenv");  //require dotenv package
dotenv.config({ path: "./config.env" });const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');
const { todoSchema } = require('./models/swaggerSchemas');

const app = express();

require('./database/connection')
// MIDDLEWARE
app.use(bodyParser.json());

// ROUTES
app.use(require('./routes/Task'));

// START THE SERVER
const port = process.env.PORT;
// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
const schemas = { todo: todoSchema };

// Generate Swagger documentation
const specs = swaggerJsdoc({
  ...swaggerOptions,
  components: { schemas }
});

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(specs));


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
