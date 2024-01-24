// Import necessary modules and dependencies
import express from 'express';
import logger from '../logger.mjs';
import { paramError, dbError } from '../errors.mjs';
import * as utils from '../utils/queries.js';
// Create a new router
const router = express.Router();
// Helper functions for query parameter normalization
// (Assuming these functions are defined elsewhere in your code)
// ...
// Define a single route to handle all metrics

router.get('/', async (req, res) => {
  const { query } = req;
  // Normalize and clean up query parameters
  logger.info('Searching for:', query);
  // Check if a valid metric is provided
  const metricName = query.metricName;
  if (!metricName) {
    return res.status(400).json(paramError('Param "metricName" is required'));
  }

  try {
    let results = await utils.default[metricName]();
    res.send(results);
  } catch (errMsg) {
    return res.status(500).json(errMsg);
  }
});

// Export the router
export default router;