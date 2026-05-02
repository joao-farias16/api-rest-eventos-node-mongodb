API REST - Sistema de Eventos

Descrição

Essa API foi feita com Node.js, Express e MongoDB (Atlas) para gerenciar eventos com autenticação de usuários.

Ela permite:

cadastrar usuário
fazer login (gera um token)
criar eventos
listar eventos
atualizar e deletar eventos

Tecnologias usadas

Node.js
Express
MongoDB Atlas
Mongoose
JWT
Bcrypt
Nodemon

Como rodar o projeto

Instalar as dependências:
npm install

Esse comando já instala tudo que está no package.json.

Rodar o servidor:
npm run dev

Servidor vai rodar em:
http://localhost:3000

Configuração

O projeto usa variáveis de ambiente para conectar com o banco de dados.

Autenticação

Cadastrar usuário:

POST http://localhost:3000/api/auth/register

Body:

{
  "nome": "Seu Nome",
  "email": "seu@email.com",
  "senha": "123456"
}

Login:

POST http://localhost:3000/api/auth/login

Body:

{
  "email": "seu@email.com",
  "senha": "123456"
}

Resposta:

{
  "token": "seu_token_aqui"
}

Esse token vai ser usado nas rotas protegidas.

Eventos

Criar evento (precisa de token):

POST http://localhost:3000/api/eventos

Header:

Authorization: Bearer SEU_TOKEN

Body:

{
  "titulo": "Evento Teste",
  "data": "2026-05-10",
  "descricao": "Descrição do evento"
}

Se não mandar o token certo, vai dar erro 401 (não autorizado).

Listar eventos:

GET http://localhost:3000/api/eventos

Atualizar evento:

PUT http://localhost:3000/api/eventos/:id

Header:

Authorization: Bearer SEU_TOKEN

Deletar evento:

DELETE http://localhost:3000/api/eventos/:id

Header:

Authorization: Bearer SEU_TOKEN

Como testar

Pode usar Postman ou Talend.

Passo a passo:

cria um usuário
faz login
copia o token
usa o token pra criar eventos

Observações

O token tem que ser enviado assim:
Authorization: Bearer TOKEN
Só quem criou o evento pode editar ou deletar
Banco usado: MongoDB Atlas

Estrutura do projeto

src/
controllers/
models/
routes/
middlewares/
config/
app.js

Para iniciar o servidor:

npm run dev