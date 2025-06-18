import express from "express";
import { criarUsuario, loginUsuario, redefinirSenha } from "../controllers/authController";

const router = express.Router();

router.post("/register", criarUsuario);
router.post("/login", loginUsuario);
router.post("/forgotpassword", redefinirSenha);

export default router;
