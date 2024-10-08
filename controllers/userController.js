const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the User model

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      email,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in a cookie
    res.cookie('token', token);

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body; 
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        email: user.email,
      },
    };
    // console.log(payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    // Set the token in a cookie
    // res.cookie('token', token);
    res.cookie('email',user.email);
    //console.log(user.email);
    res.status(200).json({ msg: 'Logged in successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ msg: 'Logged out successfully' });
};

// exports.getProtectedResource = (req, res) => {
//   res.status(200).json({ msg: 'Protected resource accessed' });
// };