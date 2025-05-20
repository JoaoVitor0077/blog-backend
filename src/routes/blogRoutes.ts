import express from "express";
import { createPostController, getAllPostController, getPostByIdController, updatePostController, deletePostController } from "../controllers/blogController";
import multer from 'multer';


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post("/p", upload.single('imagem'), createPostController);
router.get("/", getAllPostController);
router.get("/:id", getPostByIdController);
router.put("/:id", upload.single('imagem'), updatePostController);
router.delete("/:id", deletePostController);

export default router;