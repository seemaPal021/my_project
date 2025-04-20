import User from '../models/userModel.js';

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
}
