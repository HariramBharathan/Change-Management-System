import express from "express";
import { loginUser, registerUser, getPendingUsers, approveUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/pending-users", getPendingUsers);
router.patch("/users/:id/approve", approveUser);
router.patch("/users/:id", updateUser);

export default router;
