const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
  })
  .catch((err) => console.error("Erro de conexão MongoDB:", err));
