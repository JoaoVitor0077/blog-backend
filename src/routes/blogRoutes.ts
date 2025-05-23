import express from "express";
import { Request, Response } from "express";
import { createPostController, getAllPostController, getPostByIdController, updatePostController, deletePostController, getImagemPostController } from "../controllers/blogController";
import multer from 'multer';


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post("/", upload.single('imagem'), createPostController);
router.get("/", getAllPostController);
router.get("/:id", getPostByIdController);
router.put("/:id", upload.single('imagem'), updatePostController);
router.delete("/:id", deletePostController);
router.get("/:id/imagem", getImagemPostController as (req: Request, res: Response) => any);

export default router;