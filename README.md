````md
API REST - Sistema de Gestão de Eventos

Descrição

Projeto desenvolvido com Node.js, Express e MongoDB (Atlas) para gerenciamento de eventos com autenticação de usuários e interface web simples.

O sistema permite:

* Cadastro de usuários
* Login com autenticação via token (JWT)
* Recuperação de senha (via email informado)
* Criação de eventos
* Listagem de eventos (todos os usuários veem todos)
* Edição e exclusão de eventos (somente pelo criador)
* Interface web para interação com o sistema

---

Tecnologias utilizadas

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JWT (autenticação)
* Bcrypt (criptografia de senha)
* EJS (views)
* JavaScript (frontend)

---

Como rodar o projeto

1. Instalar as dependências

```bash
npm install
````

---

2. Configuração

O projeto utiliza variáveis de ambiente para conexão com o banco de dados.

---

3. Executar o servidor

```bash
npm run dev
```

Servidor rodando em:

[http://localhost:3000](http://localhost:3000)

---

Acesso às páginas

* Login: [http://localhost:3000/login](http://localhost:3000/login)
* Registro: [http://localhost:3000/register](http://localhost:3000/register)
* Eventos: [http://localhost:3000/eventos](http://localhost:3000/eventos)
* Recuperar senha: [http://localhost:3000/forgot-password](http://localhost:3000/forgot-password)

---

Autenticação

Cadastro:

POST [http://localhost:3000/api/auth/register](http://localhost:3000/api/auth/register)

Body:

```json
{
  "nome": "Seu Nome",
  "email": "email@email.com",
  "senha": "123456"
}
```

---

Login:

POST [http://localhost:3000/api/auth/login](http://localhost:3000/api/auth/login)

Body:

```json
{
  "email": "email@email.com",
  "senha": "123456"
}
```

Resposta:

```json
{
  "token": "TOKEN_AQUI"
}
```

Guarde o token retornado, ele será utilizado nas rotas protegidas.

---

Recuperação de senha

PUT [http://localhost:3000/api/auth/reset-password](http://localhost:3000/api/auth/reset-password)

Body:

```json
{
  "email": "email@email.com",
  "novaSenha": "nova123"
}
```

---

Eventos

Criar evento (rota protegida):

POST [http://localhost:3000/api/eventos](http://localhost:3000/api/eventos)

Header obrigatório:

```plaintext
Authorization: Bearer SEU_TOKEN
```

Exemplo:

```plaintext
Authorization: Bearer eyJhbGciOi...
```

Body:

```json
{
  "titulo": "Feira de Tecnologia",
  "data": "2026-08-22",
  "descricao": "Evento sobre tecnologia e programação"
}
```

Se o token não for enviado corretamente a API retornará:

```plaintext
401 - Acesso negado
```

---

Listar eventos:

GET [http://localhost:3000/api/eventos](http://localhost:3000/api/eventos)

Todos os usuários podem visualizar todos os eventos cadastrados.

Essa rota não necessita autenticação.

---

Atualizar evento (somente criador):

PUT [http://localhost:3000/api/eventos/:id](http://localhost:3000/api/eventos/:id)

Header obrigatório:

```plaintext
Authorization: Bearer SEU_TOKEN
```

Body:

```json
{
  "titulo": "Evento atualizado",
  "data": "2026-09-15",
  "descricao": "Descrição atualizada"
}
```

Somente o usuário criador pode editar.

---

Deletar evento (somente criador):

DELETE [http://localhost:3000/api/eventos/:id](http://localhost:3000/api/eventos/:id)

Header obrigatório:

```plaintext
Authorization: Bearer SEU_TOKEN
```

Somente o usuário criador pode excluir.

---

Fluxo recomendado para testes no Postman / Thunder Client / Talend

1. Criar uma conta

2. Fazer login

3. Copiar o token retornado

4. Inserir o token no Header:

```plaintext
Authorization: Bearer SEU_TOKEN
```

5. Criar, editar ou excluir eventos normalmente

---

Regras do sistema

* Todos os usuários podem visualizar todos os eventos
* Apenas o usuário que criou o evento pode editar ou excluir
* Senhas são armazenadas de forma criptografada
* Autenticação baseada em JWT

---

Estrutura do projeto

```plaintext
src/
  controllers/
  models/
  routes/
  middlewares/
  config/
  views/
  public/
  app.js
```

---

Observações

* A funcionalidade de recuperação de senha foi implementada de forma simplificada (sem envio de email)
* O projeto possui interface web para facilitar testes e demonstração

```
```
