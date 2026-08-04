require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const { connectDB } = require("./config/db");

// Rotas
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");

app.use(express.json());

// Swagger
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            persistAuthorization: true
        }
    })
);

// Views 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/forgot-password", (req, res) => {
    res.render("forgot-password");
});

app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

app.get("/categorias", (req, res) => {
    res.render("categorias");
});

app.get("/produtos", (req, res) => {
    res.render("produtos");
});

app.get("/clientes", (req, res) => {
    res.render("clientes");
});

app.get("/pedidos", (req, res) => {
    res.render("pedidos");
});

// Rotas da API
app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/pedidos", pedidoRoutes);

// Página inicial
app.get("/", (req, res) => {
    res.send("API Loja 2.0 rodando");
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar servidor:", error);
        process.exit(1);
    }
}

startServer();