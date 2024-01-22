import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcrypt";

import User from "../models/user.js";

const get_users = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
    console.log("Found users");
    next(); // pass control to next middleware/route handler
  } catch (error) {
    res.status(200).json({ error: error.message });
    console.log(error);
  }
};

const create_user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const hashed_password = await hash(password, 10); // hash is a promise -> asynchronous function
    const existing_user = await User.findOne({ email });
    if (existing_user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = new User({ name:name, email, password: hashed_password });
    await user.save().then(() => {
      console.log("User created");
      return res
        .status(201)
        .json({ message: "User created", user: user._id.toString() });
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: err.message });
  }
};

const login_user = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(401).send("User not registered");
    }
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch){
      return res.status(401).send("Invalid password");
    }
    res.status(200).json({message: "Login successful"});
  } catch(err) {
    console.log(err);
    res.json({error: err.message});
  }
};

export { get_users, create_user, login_user };
