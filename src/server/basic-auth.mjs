import express from 'express';
import jwt from 'jsonwebtoken';
const users = [{ username: process.env.ADMIN_USER_NAME, password: process.env.ADMIN_USER_PASSWORD }];
const secretKey = process.env.JWT_TOKEN_SECRET_VALUE // Use JWT_SECRET from env variable or a fallback value
const router = express.Router();

router.post('/', (req, res, next) => {
  const { username, password } = req.body;

  // Implement your own logic for checking the username and password here
  const isValidUser = checkUserCredentials(username, password);

  console.log("isValidUser",isValidUser);
  if (isValidUser) {
    // Generate JWT tok en using the JWT_SECRET from environment variable
    const token = generateToken(username);

    // Send JSON response with token
    return res.status(200).json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

function checkUserCredentials(username, password) {
  // Replace this with your own logic for checking the username and password
  // For example, you might compare against a database or an array of valid users
  // Ensure you have the 'users' array defined before using this function
  return users.some((user) => user.username === username && user.password === password);
}

function generateToken(username) {
  // Create a JWT token with the user's username as the payload
  return jwt.sign({ username }, secretKey, { expiresIn: '24h' }); // Token expires in 24 hours
}

export default router;