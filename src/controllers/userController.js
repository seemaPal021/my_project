import User from '../models/userModel.js';
import jsonwebtoken from '../utils/utility.js';
import CONSTANTS from "../config/constants.js"

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).send({ message: "name is required" });
    }
    if (!email) {
     return res.status(400).send({ message: CONSTANTS.EMAIL_REQ });
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
      res.status(400).send({ message: CONSTANTS.EMAIL_REQ });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    const user = await User.findOne({ email });
    console.log(user)
    if (user && user.password == password) {
      const token=jsonwebtoken(user._id);
      res.status(201).send({ message: " login sucessfully", token });
    }
    else {
      res.status(401).send({ message: "Invalid user email or password" })
    }
  } catch (error) {
    res.status(500).json({ message: 'login failed', error: error.message });
  }
}

export async function search(req, res) {
  try {
    console.log(req.headers);
    const users_name=req.query.name || "";
    const users_email=req.query.email ||
    console.log(users_name);
    let filterObject= {}
    if(users_name){
      filterObject.name= users_name
    }
    if(users_email){
      filterObject.email=users_email
    }
    

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const users = await User.find(filterObject).select('-password').skip(skip).limit(limit)
    console.log(users);
    
    if (users.length > 0) {

      res.status(200).send({
        message: 'User Data found',
        data: users,
        count: users.length,
        totalPages: Math.ceil(await User.countDocuments() / limit),
        currentPage: page
      });
    } else {
      res.status(404).send({ message: 'No users found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

export async function deleteUser(req, res){
  const userId= req.params.id
  if(!userId){
    return res.status(400).send({message: "UserID is missing"})
  }
  const result = await User.deleteOne({_id: userId})
  console.log(result);
  
  if(result.deletedCount==0){
    res.status(500).send({message: "Something went wrong unable to delete"})
  }else{
    res.status(200).send({message: "User deleted sucessfully"})
  }

}

