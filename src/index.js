const express = require('express');
require('dotenv').config();
const routes = require('./routes');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./utils/logger');
const notFoundHandler = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'));
}
app.use(routes);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => logger.info(`app listen on port ${PORT}`));