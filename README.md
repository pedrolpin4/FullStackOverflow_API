# FullStackOverflow-API

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## About

Já ficou com alguma dúvida ou curioso sobre algum tipo de assunto específico? Foi para isso que construímos esta API.

FullStackOverflow é uma API as pessoas podem publicar e responder perguntas livremente.

A API possui as seguintes rotas:

<details>
    <summary><strong>POST</strong>  /questions</summary>
    
* Adiciona uma nova rpergunta
    
    ```json
      {
	      "question": "What the hell is happening?",
	      "student": "Bob",
	      "class": "T3",
	      "tags": "typescript, life, javascript"
      }
    ```
    
   It must return the id of the question you've registered

```json
      {
         "id": 123456
      }
```
      
</details> 

<details>
    <summary><strong>GET</strong>  /questions/:id</summary>
    
There are 2 possibilities, an answered question or a question that has not been answered yet
```json
{
	"question": "What the hell is going on?",
	"student": "Bob",
	"class": "T3",
	"tags": "typescript, vida, javascript"
	"answered": false,
	"submitAt": "2021-01-01 10:12"
}
```

E pergunta respondida.

```json
{
	"question": "What the hell is going on?",
	"student": "Zoru",
	"class": "T3",
	"tags": "typescript, vida, javascript"
	"answered": true,
	"submitAt": "2021-01-01 10:12"
	"answeredAt": "2021-01-01 10:30"
	"answeredBy": "Vegeta",
	"answer": "More than 8 thousand!!" 
}
```
</details> 

<details>
    <summary><strong>POST</strong> /questions/:id</summary>
    
This route is used to answer the question  e ela deve capturar um based on th question's id **Bearer token** that'll be used to identify the student who answered

```json
{
	"answer": "More than 8 thousand" 
}
```
</details>

<details>
    <summary><strong>GET</strong> /questions</summary>

This route must return only the unanswered questions

```json
[
	{
		"id": 123243,
		"question": "What the hell is going on?", 
		"student": "Bob", 
		"class": "T3",
		"submitAt": "2021-01-01 10:12"
	}
]
```
</details>


<details>
    <summary><strong>POST</strong> /users</summary>
    
This route is used to register an user

```json
{
	"name": "Vegeta",
	"class": "T3" 
}
```

```json
{
	"token": "1234-5678"
}
```
</details>

## Como rodar o projeto?

Rode localmente seguindo os passos abaixo:

1. Clone este repositorio
2. Instale as dependencias
```bash
npm i
```
3. Abra um arquivo "database_backup.sql", copie e cole o script para criar seu banco de dados no postgres;

4. Crie um arquivo '.env.dev' seguindo o arquivo '.env.example';

5.Rode o backend 
```bash
npm run start:dev
```
