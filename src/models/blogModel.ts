import {db} from "../database/connection";

// Criar post
export const createPost = async (
  titulo: string,
  conteudo: string,
  imagem: Buffer | null,
  usuario_id: number
) => {
  const [result] = await db.promise().execute(
    'INSERT INTO posts (titulo, conteudo, imagem, usuario_id) VALUES (?, ?, ?, ?)',
    [titulo, conteudo, imagem ?? null, usuario_id]
  );
  return result;
};
  
// Função que lista todos os posts
export const getAllPosts = async () => {
    const[rows] = await db.promise().execute('SELECT * FROM posts');
    return rows;
}

// Função para buscar o post por ID
export const getPostById = async (id: number) => {
    const[rows] = await db.promise().execute('SELECT * FROM posts WHERE id = ?', [id]);
    return rows;
}

export const updatePost = async (
    id: number,
    titulo: string,
    conteudo: string,
    imagem: Buffer | null,
    usuario_id: number
) => {
    await db.promise().query(
    'UPDATE posts SET titulo = ?, conteudo = ?, imagem = ? WHERE id = ? AND usuario_id = ?',
    [titulo, conteudo, imagem ?? null, usuario_id]
  );
};

// Função para deletar Post
export const deletePost = async (id: number, usuario_id: number) => {
    await db.promise().execute('DELETE FROM posts WHERE id = ? AND usuario_id = ?',
        [id, usuario_id]
    );
};