import { ResultSetHeader, RowDataPacket } from "mysql2";
import {db} from "../database/connection";

  //Função para criar um novo usuário
  export const createUser = ( 
    nome: string, 
    email: string, 
    senha: string, 
    callback: (err: Error | null, results?: ResultSetHeader) => void) => {
    const query = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    db.query(query, [nome, email, senha], (err, results) => {
      callback(err, results as ResultSetHeader);
    });
  };

  //Função para encontrar o usuário pelo email
  export const findUserByEmail = (
    email: string,
    callback: (err: Error | null, results?: RowDataPacket[]) => void) => {
    const query = "SELECT * FROM usuarios WHERE email = ?";
    db.query(query, [email], (err, results) => {
        callback(err,results as RowDataPacket[])
    });
  };

  //Função para atualizar a senha de um usuário baseado no email
export const updateUserPasswordByEmail = (
  email: string,
  novaSenha: string,
  callback: (err: Error | null, results?: ResultSetHeader) => void
) => {
  const query = "UPDATE usuarios SET senha = ? WHERE email = ?";
  db.query(query, [novaSenha, email], (err, results) => {
    callback(err, results as ResultSetHeader);
  });
};
