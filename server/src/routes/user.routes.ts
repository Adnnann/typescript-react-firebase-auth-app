import express, { Express } from "express";
import userCtrl from "../controllers/user.controller";

const router: express.Router = express.Router();

router.post("/register", userCtrl.registerUser);
router.post("/login", userCtrl.loginUser);
router.get("/user", userCtrl.getUser);

export default router;
