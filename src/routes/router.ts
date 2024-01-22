import { Router } from "express";

import user_router from "./user_router.js";
import chat_router from "./chat_router.js";

const router = Router();

router.use("/users", user_router);
router.use("/chat", chat_router);

export default router;
