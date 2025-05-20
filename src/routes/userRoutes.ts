import express from "express";
import { criarUsuario, loginUsuario } from "../controllers/authController";

const router = express.Router();

router.post("/register", criarUsuario);
router.post("/login", loginUsuario);

export default router;
