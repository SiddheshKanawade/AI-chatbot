import { Router } from "express";

import { get_users, create_user, login_user } from "../controllers/user_controller.js";
import {validate, signupValidate, loginValidate} from '../utils/validators.js'

const user_router = Router();

user_router.get("/", get_users);
user_router.post("/login", validate(loginValidate), login_user);
user_router.post("/signup", validate(signupValidate), create_user);

export default user_router;
