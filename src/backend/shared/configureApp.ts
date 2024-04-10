require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const serverless = require('serverless-http');

module.exports = (configureApp) => {
  const app = express();

  app.use(express.json({limit: '10mb'}));
  app.use(express.urlencoded({limit: '10mb', extended: true}));

  // Important stuff for yandex cloud.
  if (process.env.PROXY_COUNT) {
    app.set('trust proxy', process.env.PROXY_COUNT);
  }

  // Cors config.
  app.use(cors(
    {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  ));

  app.use(function(_, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept,content-type,application/json,Set-Cookie'
    );
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');

    next();
  });

  app.use(cookieParser());

  const DB_PASSWORD = process.env.DB_PASSWORD;

  const mongoose = require('mongoose');
  const dbURI = `mongodb+srv://uwudev:${DB_PASSWORD}@atlascluster.k5fxxuq.mongodb.net/?retryWrites=true&w=majority`;

  // Cloud functions warming up.
  app.get('/warmup', (_, res) => {
    res.status(200).json('');
  });

  configureApp(app);

  let server;
  return async (event, context) => {
    const patchedEvent = {
      ...event,
      path: event.url.replace(/\?.*/, ""),
      originalPath: event.path
    }

    // This closure allows us to create an app only once.
    if (!server) {
      await mongoose.connect(dbURI);

      server = serverless(app);
    }

    return server(patchedEvent, context);
  }
}
