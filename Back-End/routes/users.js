import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET USER BY ID
router.get("/:id", verifyUser, getUser);

// GET ALL USER
router.get("/", verifyAdmin, getUsers);

export default router;
