import express from "express";
import { Request, Response } from "express";
import { createPostController, getAllPostController, getPostByIdController, updatePostController, deletePostController, getImagemPostController, getMyPostsController } from "../controllers/blogController";
import multer from 'multer';
import { authenticate } from "../middlewares/authMiddleware";


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post("/", authenticate, upload.single('imagem'), createPostController);
router.get("/", getAllPostController);
router.get("/:id", getPostByIdController);
router.put("/:id", upload.single('imagem'), updatePostController);
router.delete("/:id", deletePostController as (req: Request, res: Response) => any);
router.get("/:id/imagem", getImagemPostController as (req: Request, res: Response) => any);

// NOVA ROTA: Para buscar posts do usuário logado
router.get('/posts/me', authenticate, getMyPostsController);

export default router;