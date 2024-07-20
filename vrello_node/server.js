const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Task = require('./models/Task');
const { verifyToken } = require('./middleware/authMiddleware');
const keys = require('./config/keys');
const taskRoutes = require('./routes/tasks'); // Import task routes


// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Passport configuration
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/api/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  const { id, emails, photos } = profile;
  const email = emails[0].value;
  const avatar = photos[0].value;

  try {
    let user = await User.findOne({ googleId: id });
    if (user) {
      return done(null, user);
    }

    user = new User({
      googleId: id,
      email,
      avatar
    });

    await user.save();
    done(null, user);
  } catch (err) {
    console.error(err.message);
    done(err, null);
  }
}));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Auth Routes
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const payload = {
      user: {
        id: req.user.id
      }
    };

    jwt.sign(
      payload,
      keys.jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.redirect(`http://localhost:3000?token=${token}`);
      }
    );
  }
);

// Task Routes
// Create a new task
app.post('/api/tasks', verifyToken, async (req, res) => {
  const { title, description, column } = req.body;
  try {
    const task = new Task({
      title,
      description,
      column,
      createdBy: req.user.id,
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tasks
app.get('/api/tasks', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a task
app.put('/api/tasks/:id', verifyToken, async (req, res) => {
  const { title, description, column } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.column = column || task.column;
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task
app.delete('/api/tasks/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    await task.remove();
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Connect to MongoDB and start server
mongoose.connect('mongodb://localhost:27017/vrello', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
