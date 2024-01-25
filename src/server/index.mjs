import path from 'path';
import express from 'express';
import cors from 'cors'; // Import the cors middleware

// Set up multer storage
import './config.mjs';
import log, { expressLog } from './logger.mjs';
import config from './routes/config.mjs';
import filesRoutes from './routes/files.mjs';
import searchRoutes from './routes/search.mjs';
import downloadRoutes from './routes/download.mjs';
import healthRoute from './routes/health.mjs';
import versionRoute from './routes/version.mjs';
import metricsRoute from './routes/metrics.mjs';
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken package

import basicAuthMiddleware from './basic-auth.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const APP_PORT = 8087;

const app = express();
app.use(express.static(path.join(__dirname, '../../', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../', 'public', 'index.html'));
});
app.use('/healthcheck', healthRoute);
app.use('/config', config);
app.use('/meet-external/rtc-visualizer/config', config);
app.use(cors());
app.use(express.json()); // Middleware to parse JSON in the request body
// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log("authHeader", authHeader);
  // Skip authentication for specific route
  if (req.path === '/user/login' && !authHeader) {
    req.isCustomerLogin = false; // Set a flag to indicate that it's not a customer login
    return next();
  }

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET_VALUE, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    if (user.ownerId) {
      req.isCustomerLogin = true;
    }
    next();
  });
};
app.use(authenticateJWT);

// use custom logger
app.use(expressLog);
app.use('/metrics', metricsRoute);
app.use('/users/login', basicAuthMiddleware);
app.use('/files', filesRoutes);
app.use('/search', searchRoutes);
app.use('/download', downloadRoutes);
app.use('/version', versionRoute);

app.listen(APP_PORT, () => {
  log.info('App started on port: %s', APP_PORT);
});