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
export const getAllPosts = async (usuario_id: number) => {
    const[rows] = await db.promise().execute('SELECT * FROM posts');
    return rows;
}
// Função que lista os posts do usuário logado
export const getMyPosts = async (usuario_id: number) => {
    const[rows] = await db.promise().execute('SELECT * FROM posts WHERE usuario_id = ?', [usuario_id]);
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
  if (imagem) {
    // Atualiza tudo incluindo imagem
    await db.promise().execute(
      'UPDATE posts SET titulo = ?, conteudo = ?, imagem = ? WHERE id = ? AND usuario_id = ?',
      [titulo, conteudo, imagem, id, usuario_id]
    );
  } else {
    // Atualiza sem mexer na imagem
    await db.promise().execute(
      'UPDATE posts SET titulo = ?, conteudo = ? WHERE id = ? AND usuario_id = ?',
      [titulo, conteudo, id, usuario_id]
    );
  }
};

// Função para deletar Post
export const deletePost = async (id: number, usuario_id: number) => {
    await db.promise().execute('DELETE FROM posts WHERE id = ? AND usuario_id = ?',
        [id, usuario_id]
    );
};

export const getImagemByPostId = async (id: number) => {
  const [rows] = await db.promise().execute('SELECT imagem FROM posts WHERE id = ?', [id]);
  const result = rows as any[];
  if (result.length === 0) return null;
  return result[0].imagem; // vai ser um Buffer ou null
};

