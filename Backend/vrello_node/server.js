const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const User = require('./models/User');

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
