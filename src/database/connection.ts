// Aqui está toda configuração do banco de dados

// Importa a biblioteca mysql2. Isso permite a comunicação com o banco de dados 
import mysql from "mysql2";

// Importa o dotenv para carregar variáveis de ambiente do arquivo .env.
import dotenv from "dotenv";

// Isso carrega as variáveis de ambiente
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST, // Aqui é o endereço do servidor MySQL (localhost)
  user: process.env.DB_USER, // O usuário do MySQL
  password: process.env.DB_PASS, // A senha do MySQL
  database: process.env.DB_NAME, // O nome do database
});

// tratativa de erro
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL!");
  }
});