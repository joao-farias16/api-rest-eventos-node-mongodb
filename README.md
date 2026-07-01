# API REST - Sistema de Gestão de Loja

## Descrição

Projeto desenvolvido com **Node.js**, **Express** e **MySQL** para gerenciamento de uma loja através de uma API REST.

A aplicação possui autenticação utilizando **JWT**, documentação interativa com **Swagger/OpenAPI** e permite o gerenciamento completo das seguintes entidades:

- Usuários
- Categorias
- Produtos
- Clientes
- Pedidos

Além disso, a API possui uma rota pública de monitoramento para verificação do status da aplicação.

---

# Tecnologias utilizadas

- Node.js
- Express
- MySQL
- mysql2
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- Swagger UI
- Swagger JSDoc
- OpenAPI 3.0
- EJS

---

# Pré-requisitos

Antes de executar o projeto é necessário possuir instalado:

- Node.js
- MySQL Server
- MySQL Workbench (opcional, porém recomendado)

---

# Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd NOME_DO_PROJETO
```

Instale as dependências:

```bash
npm install
```

---

# Configuração do Banco de Dados

Crie um banco chamado:

```sql
CREATE DATABASE loja;
```

Depois execute o script:

```
loja.sql
```

Esse script irá criar todas as tabelas necessárias.

---

# Configuração das variáveis de ambiente

Crie um arquivo chamado:

```
.env
```

Utilize a seguinte configuração:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=SUA_SENHA
DB_NAME=loja

JWT_SECRET=SUA_CHAVE_SECRETA

PORT=3000
```

---

# Executando o projeto

Execute:

```bash
npm run dev
```

Se tudo estiver correto aparecerá:

```
MySQL conectado
Servidor rodando na porta 3000
```

---

# Endereços importantes

API:

```
http://localhost:3000
```

Swagger:

```
http://localhost:3000/api-docs
```

Status da API:

```
GET /api/status
```

Resposta:

```json
{
    "versao":"2.0.0",
    "status":"online"
}
```

---

# Fluxo completo para testar a API

## 1. Registrar usuário

Execute:

```
POST /api/auth/register
```

Body:

```json
{
    "nome":"Administrador",
    "email":"admin@email.com",
    "senha":"123456"
}
```

---

## 2. Fazer Login

Execute:

```
POST /api/auth/login
```

Body:

```json
{
    "email":"admin@email.com",
    "senha":"123456"
}
```

Resposta:

```json
{
    "token":"TOKEN",
    "usuario":{
        "id":1,
        "nome":"Administrador",
        "email":"admin@email.com"
    }
}
```

Guarde:

- token
- id do usuário

Eles serão utilizados em todas as rotas protegidas.

---

## 3. Autorizar o Swagger

Clique em:

```
Authorize
```

Informe:

```
Bearer SEU_TOKEN
```

Clique em:

```
Authorize
```

---

## 4. Informar o x-user-id

Todas as rotas protegidas exigem também o header:

```
x-user-id
```

Informe exatamente o ID retornado no login.

Exemplo:

```
x-user-id: 1
```

---

# Ordem recomendada para testes

Como existem relacionamentos entre as tabelas, recomenda-se utilizar a seguinte sequência.

## Categorias

Criar categoria:

```
POST /api/categorias
```

```json
{
    "nome":"Informática"
}
```

---

## Produtos

Antes de cadastrar um produto, deve existir uma categoria.

Exemplo:

```
POST /api/produtos
```

```json
{
    "nome":"Notebook",
    "valor":3500,
    "estoque":15,
    "categorias_id_categoria":1
}
```

---

## Clientes

```
POST /api/clientes
```

```json
{
    "nome":"João Silva",
    "telefone":"51999999999",
    "status":1
}
```

---

## Pedidos

Antes de cadastrar um pedido é necessário existir:

- Cliente
- Produto

Exemplo:

```
POST /api/pedidos
```

```json
{
    "data":"2026-07-01",
    "clientes_id_cliente":1,
    "produtos":[
        {
            "produtos_id_produto":1,
            "quantidade":2,
            "valor":3500
        }
    ]
}
```

---

# Endpoints disponíveis

## API

| Método | Endpoint |
|---------|----------|
| GET | /api/status |

---

## Autenticação

| Método | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| PUT | /api/auth/change-password |
| PUT | /api/auth/reset-password |

---

## Categorias

| Método | Endpoint |
|---------|----------|
| GET | /api/categorias |
| GET | /api/categorias/{id} |
| POST | /api/categorias |
| PUT | /api/categorias/{id} |
| DELETE | /api/categorias/{id} |

---

## Produtos

| Método | Endpoint |
|---------|----------|
| GET | /api/produtos |
| GET | /api/produtos/{id} |
| POST | /api/produtos |
| PUT | /api/produtos/{id} |
| DELETE | /api/produtos/{id} |

---

## Clientes

| Método | Endpoint |
|---------|----------|
| GET | /api/clientes |
| GET | /api/clientes/{id} |
| POST | /api/clientes |
| PUT | /api/clientes/{id} |
| DELETE | /api/clientes/{id} |

---

## Pedidos

| Método | Endpoint |
|---------|----------|
| GET | /api/pedidos |
| GET | /api/pedidos/{id} |
| POST | /api/pedidos |
| PUT | /api/pedidos/{id} |
| DELETE | /api/pedidos/{id} |

---

# Segurança

A API utiliza autenticação baseada em JWT.

Todas as rotas protegidas exigem:

- Token JWT válido
- Header `x-user-id` correspondente ao usuário autenticado

Caso essas informações não sejam enviadas corretamente a API retornará:

```
401 Unauthorized
```

ou

```
403 Forbidden
```

---

# Estrutura do projeto

```
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── public/
├── views/
├── app.js
```

---

# Documentação

Toda a documentação pode ser acessada através do Swagger:

```
http://localhost:3000/api-docs
```

Através dele é possível:

- visualizar todos os endpoints;
- testar requisições;
- enviar JSON;
- utilizar autenticação JWT;
- consultar respostas e códigos HTTP.

---

# Autor

Projeto desenvolvido para fins acadêmicos na disciplina de Desenvolvimento de APIs REST.