
# Doar Digital API

API REST responsável por gerenciar as informações de doações.

Esta API foi construída com NodeJS e [Koa.js](https://koajs.com/). A aplicação  espera um banco de dados PostgreSQL.

Para rodar a aplicação localmente, foi utilizado o [Docker](https://www.docker.com/).

## Execução da API

```bash
cd api/
docker compose up -d
```

## Autenticação

A API utiliza [Bearer Authentication](https://dev.writer.com/docs/authentication).

Exemplos de requisição utilizando o esquema de autenticação:

```bash
curl --request GET \
  --url https://doardigital-api.vercel.app/admin/usuario \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZWhBZG1pbmlzdHJhZG9yIjp0cnVlLCJpYXQiOjE2ODQ1NDc2NzgsImV4cCI6MTY4NDU1MTI3OH0.HRddhhXWcN3sOgVlH05dHVsuQPEPCEf9osHlYhYOcVA'
```

```javascript
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://doardigital-api.vercel.app/admin/usuario");
xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZWhBZG1pbmlzdHJhZG9yIjp0cnVlLCJpYXQiOjE2ODQ1NDc2NzgsImV4cCI6MTY4NDU1MTI3OH0.HRddhhXWcN3sOgVlH05dHVsuQPEPCEf9osHlYhYOcVA");

xhr.send(data);
```

## Rotas

Rotas que podem ser acessadas via requisições REST. O "Content-Type" esperado para as requisições é `application/json`

A API pode ser acessada em [doardigital-api.vercel.app](https://doardigital-api.vercel.app/)

### Rotas públicas

| URL | Método | Parâmetros | Descrição | Retorno/Status
|---|---|---|---|---|
| / | GET | - | Rota de boas vindas | - |
| /login | POST | { acesso, senha } | Realiza a autenticação no serviço | { token } |
| /usuario | POST | { nome, email, acesso, telefone, ehAdministrador } | Realiza a criação de um novo usuário para autenticação | 200

### Rotas comuns

Rotas que precisam de autenticação e NÃO requerem perfil administrador.

| URL | Método | Parâmetros | Descrição | Retorno/Status
|---|---|---|---|---|
| /common/meuPerfil | GET | - | Obtém informações do usuário logado | { nome, email, acesso, telefone, ehAdministrador } |
| /common/minhasDoacoes | GET | - | Obtém as doações realizadas pelo usuário | [{ id, idUsuario, statusDoacao, idHorario, createdAt, updatedAt }] |
| /common/equipamentosDoados | GET | - | Obtém os equipamentos doados pelo usuário | [{ id, nome, modelo, marca, tempoUso, idDoacao, estadoEquipamento, createdAt, updatedAt }] |
| /common/criarDoacao | POST | { statusDoacao, idHorario } | Cria uma nova doação para o usuário | 201, 400 |
| /common/criarEquipamento | POST | { nome, modelo, marca, tempoUso, idDoacao, estadoEquipamento } | Cria um novo equipamento para uma doação do usuário | 201, 400 |

### Rotas privadas

Rotas que precisam de autenticação e requerem perfil administrador.

| URL | Método | Parâmetros | Descrição | Retorno/Status
|---|---|---|---|---|
| /usuario | GET | - | Busca por todos os usuários existentes | [{ nome, email, acesso, telefone, senha, ehAdministrador }] |
| /usuario/{id} | PATCH | { nome, acesso, telefone, ehAdministrador } | Edita um registro de usuário existente | 200, 400, 404 |
| /usuario/{id} | DELETE | - |Remove um registro de usuário existente | 200, 404 |
| /admin/doacao | GET | - | Busca por todos as doações existentes | [{ id, idUsuario, statusDoacao, idHorario, createdAt, updatedAt }] |
| /admin/doacao | POST | { idUsuario, statusDoacao, idHorario } | Cria uma nova doação | 201, 400 |
| /admin/doacao/{id} | PATCH | { statusDoacao, idHorario } | Edita um registro de doação existente | 200, 400, 404 |
| /admin/doacao/{id} | DELETE | - |Remove um registro de doação existente | 200, 404 |
| /admin/equipamento | GET | - | Busca por todos os equipamentos existentes | [{ id, nome, modelo, marca, tempoUso, idDoacao, estadoEquipamento, createdAt, updatedAt }] |
| /admin/equipamento | POST | { nome, modelo, marca, tempoUso, idDoacao, estadoEquipamento } | Cria um novo equipamento | 201, 400 |
| /admin/equipamento/{id} | PATCH | { nome, modelo, marca, tempoUso, idDoacao, estadoEquipamento } | Edita um registro de equipamento existente | 200, 400, 404 |
| /admin/equipamento/{id} | DELETE | - |Remove um registro de equipamento existente | 200, 404 |
| /admin/horario | GET | - | Busca por todos os horários existentes | [{ id, dataHora, createdAt, updatedAt }] |
| /admin/horario | POST | { dataHora } | Cria um novo horário | 201, 400 |
| /admin/horario/{id} | PATCH | { dataHora } | Edita um registro de horário existente | 200, 400, 404 |
| /admin/horario/{id} | DELETE | - |Remove um registro de horário existente | 200, 404 |
| /admin/aprovaDoacao | POST | { idDoacao } | Cria um novo horário | 200, 202 |
| /admin/rejeitaDoacao | POST | { idDoacao } | Cria um novo horário | 200, 202 |
| /admin/doacaoEntregue | POST | { idDoacao } | Cria um novo horário | 200, 202 |