
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
| /common/equipamentosDoados | GET | - | Obtém os equipamentos doados pelo usuário | [{ id, nome, modelo, marca, tempoUso, idDoacao, estadoEquipamento, createdAt, updatedAt }] |
| /common/criarEquipamento | POST | { nome, modelo, marca, tempoUso, estadoEquipamento } | Cria um novo equipamento para uma doação do usuário | 201, 400 |
| /common/uploadImagemEquipamento/{id} | POST* | { file } | Cria um novo equipamento para uma doação do usuário | 201, 400 |
| /common/getImagensEquipamento/{id} | GET | - | Obtém as imagens associadas ao equipamento** | [{ base64 }] |

*Upload da imagem realizado via requisição [multipart](https://stackoverflow.com/questions/16958448/what-is-http-multipart-request).
**As imagens retornadas estão no formato [base64](https://pt.wikipedia.org/wiki/Base64). Para renderizá-las no HTML, basta adicionar as informações de cada imagem como valores do atributo `src` de uma `img`.

### Rotas privadas

Rotas que precisam de autenticação e requerem perfil administrador.

| URL | Método | Parâmetros | Descrição | Retorno/Status
|---|---|---|---|---|
| /admin/usuario | GET | - | Busca por todos os usuários existentes | [{ nome, email, acesso, telefone, senha, ehAdministrador }] |
| /admin/usuario/{id} | PATCH | { nome, acesso, telefone, ehAdministrador } | Edita um registro de usuário existente | 200, 400, 404 |
| /admin/usuario/{id} | DELETE | - | Remove um registro de usuário existente | 200, 404 |
| /admin/equipamento | GET | - | Busca por todos os equipamentos existentes | [{ id, nome, modelo, marca, tempoUso, idDoacao, estadoEquipamento, createdAt, updatedAt }] |
| /admin/equipamento | POST | { nome, modelo, marca, tempoUso, estadoEquipamento, statusDoacao, dataEntrega } | Cria um novo equipamento | 201, 400 |
| /admin/equipamento/{id} | PATCH | { nome, modelo, marca, tempoUso, estadoEquipamento, statusDoacao, dataEntrega } | Edita um registro de equipamento existente | 200, 400, 404 |
| /admin/equipamento/{id} | DELETE | - | Remove um registro de equipamento existente | 200, 404 |
| /admin/imagemEquipamento | GET | - | Busca por todas as imagens de equipamentos existentes | [{ id, base64, tipo, idEquipamento, createdAt, updatedAt }] |
| /admin/imagemEquipamento | POST | { base64, tipo, idEquipamento } | Cria uma nova imagem equipamento | 201, 400 |
| /admin/imagemEquipamento/{id} | PATCH | { base64, tipo, idEquipamento } | Edita um registro de imagem de equipamento existente | 200, 400, 404 |
| /admin/imagemEquipamento/{id} | DELETE | - | Remove um registro de imagem de equipamento existente | 200, 404 |
