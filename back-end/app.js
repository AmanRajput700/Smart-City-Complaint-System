const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { protect } = require('./middleware/authMiddleware');

// Models
const User = require('./models/User');
const Complaint = require('./models/Complaint');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
}))
app.use(cookieParser());

// Connect to the database
connectDB();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// User Registration Endpoint
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if a user with this email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User with that email already exists.' });
    }

    // 2. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. If the user was created successfully, generate a token
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      res.cookie('token', token,{
        maxAge: 30*24*60*60*1000, // 30 days
      });
      // 5. Send a success response with user data and the token
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data received.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// User Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if a user with that email exists
    const user = await User.findOne({ email });

    // 2. If user exists, compare the provided password with the stored hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      // Passwords match. Create a token.
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      // 3. Set the token in an HTTP-Only cookie
      res.cookie('token', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });

      // 4. Send the user's data back in the response
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      // User not found or password doesn't match
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// User Logout Endpoint
app.post('/api/auth/logout', (req, res) => {
  res.cookie('token', '');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Protected User Profile Endpoint
app.get('/api/users/profile', protect, (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

