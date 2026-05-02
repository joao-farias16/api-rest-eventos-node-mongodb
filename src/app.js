require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./config/db');

app.use(express.json());

// rota de teste
app.get('/', (req, res) => {
    res.send('API rodando');
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
        process.exit(1);
    }
}

startServer();