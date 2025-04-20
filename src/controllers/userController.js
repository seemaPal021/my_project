import User from '../models/userModel.js';

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      res.status(400).send({ message: "name is required" });
    }
    if (!email) {
      res.status(400).send({ message: "email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }
    
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).send({ message: "email are required" });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    const user = await User.findOne({ email });
    console.log(user)
    if (user && user.password == password) {
      res.status(201).send({ message: " login sucessfully" });
    }
    else {
      res.status(401).send({ message: "Invalid user email or password" })
    }
  } catch (error) {
    res.status(500).json({ message: 'login failed', error: error.message });
  }
}


export async function (params) {
  
}