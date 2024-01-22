import { Router } from "express";

import { get_users, create_user } from "../controllers/user_controller.js";
import {validate, signupValidate} from '../utils/validators.js'

const user_router = Router();

user_router.get("/", get_users);
user_router.post("/", validate(signupValidate), create_user);

export default user_router;
