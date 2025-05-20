import { Request, Response } from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../models/blogModel";


// Criar novo post
export const createPostController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { titulo, conteudo, usuario_id } = req.body;
    const imagem = req.file?.buffer ?? Buffer.alloc(0);

    if (!titulo || !conteudo || !usuario_id) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
    }

    const result = await createPost(titulo, conteudo, imagem, usuario_id);
    res.status(201).json({ message: 'Post criado com sucesso', result });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ message: 'Erro interno ao criar o post.' });
  }
};

// Listar todos os posts
export const getAllPostController = async (_req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar os posts.' });
  }
};

// Buscar post por ID
export const getPostByIdController = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = Number(req.params.id);
    const post = await getPostById(id);

    if (!post || (post as any[]).length === 0) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar post.' });
  }
};

// Atualizar post
export const updatePostController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { titulo, conteudo, usuario_id } = req.body;
    const imagem = req.file ? req.file.buffer : null;

    await updatePost(id, titulo, conteudo, imagem, usuario_id);
    res.json({ message: 'Post atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar post.' });
  }
};

// Deletar post
export const deletePostController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const usuario_id = Number(req.body.usuario_id); // ou do token se for autenticado

    await deletePost(id, usuario_id);
    res.json({ message: 'Post deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar post.' });
  }
};
