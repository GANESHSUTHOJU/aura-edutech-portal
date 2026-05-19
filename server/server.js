const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');

require('./config/passport');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('AUra Edutech API is running...');
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Connect to Database
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`📡 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to DB', err);
});
