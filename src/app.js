require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./config/db');

app.use(express.json());

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

const eventoRoutes = require('./routes/eventoRoutes');

app.use('/api/eventos', eventoRoutes);

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/eventos', (req, res) => res.render('eventos'));
app.get('/forgot-password', (req, res) => res.render('forgot-password'));

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