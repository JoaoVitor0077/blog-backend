import cors from "cors";
import dotenv from "dotenv";
import express from 'express';
import userRoutes from "./routes/userRoutes";
import blogRoutes from './routes/blogRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes); // Aqui estamos dizendo que as rotas começam com "/api"
app.use("/api/posts", blogRoutes); // Aqui estamos dizendo que as rotas começam com "/api"


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});