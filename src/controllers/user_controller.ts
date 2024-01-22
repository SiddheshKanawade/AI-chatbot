import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";

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
    const user = new User({ name:name, email, password: hashed_password });
    await user.save().then(() => {
      res
        .status(201)
        .json({ message: "User created", user: user._id.toString() });
      console.log("User created");
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};

export { get_users, create_user };
