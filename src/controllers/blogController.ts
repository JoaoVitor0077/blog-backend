import { Request, Response } from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost, getImagemByPostId, getMyPosts } from "../models/blogModel";


// Criar novo post
export const createPostController = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log('Body:', req.body);
    console.log('File:', req.file);
    console.log('UserId:', (req as any).userId);
    const { titulo, conteudo } = req.body;
    const imagem = req.file ? req.file.buffer : null;
    const usuario_id = (req as any).userId; // do middleware

    if (!titulo || !conteudo) {
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
    const usuario_id = Number(_req.query.usuario_id);
    const posts = await getAllPosts(usuario_id);
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

    await updatePost(id, titulo, conteudo, imagem, Number(usuario_id));
    res.json({ message: 'Post atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    res.status(500).json({ message: 'Erro ao atualizar post.' });
  }
};

// ATUALIZADO: Controller de delete com melhor validação
export const deletePostController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const usuario_id = Number(req.body.usuario_id);
    const authenticatedUserId = (req as any).userId; // do middleware de auth

    // Verificação de segurança: usuário só pode deletar seus próprios posts
    if (usuario_id !== authenticatedUserId) {
      return res.status(403).json({ message: 'Acesso negado. Você só pode deletar seus próprios posts.' });
    }

    await deletePost(id, usuario_id);
    res.json({ message: 'Post deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    res.status(500).json({ message: 'Erro ao deletar post.' });
  }
};

// Buscar imagem do post por ID
export const getImagemPostController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const imagem = await getImagemByPostId(id);

    if (!imagem) {
      return res.status(404).json({ message: "Imagem não encontrada." });
    }
    // Definindo o tipo de conteúdo
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imagem);
  } catch (error) {
    console.error("Erro ao buscar imagem:", error);
    res.status(500).json({ message: "Erro ao buscar imagem." });
  }
};

export const getMyPostsController = async (req: Request, res: Response) => {
  try {
    const usuario_id = (req as any).userId; // vem do middleware authenticate

    const posts = await getMyPosts(usuario_id); // busca apenas os posts do usuário logado
    res.json(posts);
  } catch (error) {
    console.error('Erro ao listar posts do usuário:', error);
    res.status(500).json({ message: 'Erro ao listar os posts do usuário.' });
  }
};
