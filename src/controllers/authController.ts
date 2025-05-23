import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/userModel";
import { db } from "../database/connection";

// Função para criar usuário
export const criarUsuario = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  // Verificando se o usuário já existe
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result: any[]) => {
    if (err) return res.status(500).send("Erro no servidor.");
    
    // Verificando o resultado
    if (result && result.length > 0) {
      return res.status(400).send("Usuário já existe.");
    }

    // Criptografando a senha
    bcrypt.hash(senha, 10, (err, hash) => {
      if (err) return res.status(500).json("Erro ao criptografar senha.");

      // Salvando o novo usuário
      db.query(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, hash],
        (err) => {
          if (err) return res.status(500).send("Erro ao criar usuário.");
          return res.status(201).send("Usuário criado com sucesso.");
        }
      );
    });
  });
};

// Função para login de usuário
export const loginUsuario = (req: Request, res: Response) => {
  const { email, senha } = req.body;

  //Verifica se o usuário existe
  findUserByEmail(email, (err: any, results: any) => {
    if (results.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verificando a senha
    bcrypt.compare(senha, results[0].senha, (err, isMatch) => {
      if (err || !isMatch) {
          return res.status(400).json({message: "Senha incorreta."});
      }

      // Gerando o token de autenticação
      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET || "default_secret", 
        { expiresIn: "1h" });

      return res.status(200).json({ token });
      
    });
  });
};

// Função para fazer logout
export const logoutUsuario = (req: Request, res: Response) => {
  
}

// Função para redefinir a senha
export const redefinirSenha = (req: Request, res: Response) => {
  const { email, novaSenha } = req.body;

  // Verificando se o usuário existe
  findUserByEmail(email, (err: any, results: any) => {
    if (results.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Criptografando a nova senha
    bcrypt.hash(novaSenha, 10, (err, hash) => {
      if (err) return res.status(500).json("Erro ao criptografar senha.");

      // Atualizando a senha do usuário
      db.query(
        "UPDATE usuarios SET senha = ? WHERE email = ?",
        [hash, email],
        (err) => {
          if (err) return res.status(500).send("Erro ao atualizar senha.");
          return res.status(200).send("Senha atualizada com sucesso.");
        }
      );
    });
  });
};

