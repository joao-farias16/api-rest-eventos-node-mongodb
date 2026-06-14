# API REST - Sistema de Gestão de Eventos

## Descrição

Projeto desenvolvido com Node.js, Express e MongoDB (Atlas) para gerenciamento de eventos com autenticação de usuários e interface web simples.

O sistema permite:

* Cadastro de usuários
* Login com autenticação via token (JWT)
* Recuperação de senha (via email informado)
* Criação de eventos
* Listagem de eventos (todos os usuários veem todos)
* Busca de eventos por ID
* Edição e exclusão de eventos (somente pelo criador)
* Interface web para interação com o sistema
* Documentação interativa da API utilizando Swagger/OpenAPI

---

## Tecnologias utilizadas

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JWT (autenticação)
* Bcrypt (criptografia de senha)
* EJS (views)
* JavaScript (frontend)
* Swagger UI
* Swagger JSDoc
* OpenAPI 3.0

---

## Como rodar o projeto

### 1. Instalar as dependências

```bash
npm install
```

---

### 2. Configuração

O projeto utiliza variáveis de ambiente para conexão com o banco de dados.

---

### 3. Executar o servidor

```bash
npm run dev
```

Servidor rodando em:

http://localhost:3000

---

## Acesso às páginas

* Login: http://localhost:3000/login
* Registro: http://localhost:3000/register
* Eventos: http://localhost:3000/eventos
* Recuperar senha: http://localhost:3000/forgot-password
* Documentação Swagger: http://localhost:3000/api-docs

---

## Autenticação

### Cadastro

**POST** `/api/auth/register`

Body:

```json
{
  "nome": "Seu Nome",
  "email": "email@email.com",
  "senha": "123456"
}
```

---

### Login

**POST** `/api/auth/login`

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

### Recuperação de senha

**PUT** `/api/auth/reset-password`

Body:

```json
{
  "email": "email@email.com",
  "novaSenha": "nova123"
}
```

---

## Eventos

### Criar evento (rota protegida)

**POST** `/api/eventos`

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

### Listar eventos

**GET** `/api/eventos`

Todos os usuários podem visualizar todos os eventos cadastrados.

Essa rota não necessita autenticação.

---

### Buscar evento por ID

**GET** `/api/eventos/:id`

Exemplo:

```plaintext
GET /api/eventos/ID_DO_EVENTO
```

Retorna os dados completos do evento informado.

---

### Atualizar evento (somente criador)

**PUT** `/api/eventos/:id`

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

### Deletar evento (somente criador)

**DELETE** `/api/eventos/:id`

Header obrigatório:

```plaintext
Authorization: Bearer SEU_TOKEN
```

Somente o usuário criador pode excluir.

---

## Documentação Swagger

A API possui documentação interativa gerada com Swagger/OpenAPI.

Acesse:

```plaintext
http://localhost:3000/api-docs
```

Através da interface é possível:

* Visualizar todos os endpoints
* Testar requisições diretamente pelo navegador
* Enviar dados JSON
* Visualizar respostas da API
* Verificar códigos de status HTTP
* Utilizar autenticação JWT através do botão "Authorize"

---

## Fluxo recomendado para testes via Swagger

1. Acesse:

```plaintext
http://localhost:3000/api-docs
```

2. Crie uma conta utilizando:

```plaintext
POST /api/auth/register
```

3. Faça login utilizando:

```plaintext
POST /api/auth/login
```

4. Copie o token JWT retornado

5. Clique no botão **Authorize** no topo da página

6. Informe:

```plaintext
Bearer SEU_TOKEN
```

7. Clique em **Authorize**

8. Utilize normalmente os endpoints protegidos através do botão **Try it out**

O Swagger enviará automaticamente o token para todas as rotas protegidas.

---

## Regras do sistema

* Todos os usuários podem visualizar todos os eventos
* Apenas o usuário que criou o evento pode editar ou excluir
* Senhas são armazenadas de forma criptografada
* Autenticação baseada em JWT
* Endpoints protegidos exigem token válido

---

## Estrutura do projeto

```plaintext
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── views/
├── public/
├── app.js
└── swagger.js
```

---

## Observações

* A funcionalidade de recuperação de senha foi implementada de forma simplificada (sem envio de email)
* O projeto possui interface web para facilitar testes e demonstração
* A documentação interativa da API foi implementada utilizando Swagger/OpenAPI
* Todas as rotas podem ser testadas diretamente pela interface disponível em `/api-docs`
