const User = require('../models/User');
const bcrypt = require('bcryptjs');

const signup= async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashed });

    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports ={ signup };
