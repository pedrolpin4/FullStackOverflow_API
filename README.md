# FullStackOverflow-API

	<p align="center" >
		<img width="534" alt="Screen Shot 2021-12-13 at 16 43 58" src="https://user-images.githubusercontent.com/87671165/145877878-be55f3ec-3078-4120-b767-491bfd130e09.png">
	</p>

## About

Have you ever been stuck with a bug that feels impossible to be solved? That's why we've created this API, to make you life easier in terms of debugging your program. In this API you can ask and answer questions to make our community more united.

This API contains the following routes:

<details>
    <summary><strong>POST</strong>  /questions</summary>
    
* Adds a new question
    
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

<details>
    <summary><strong>PUT</strong> /questions/:id/upvote</summary>
    
This route is used to upvote a question. Each question will be posted with a initial score of 1

</details>

<details> 
    <summary><strong>PUT</strong> /questions/:id/downvote</summary>
    
This route is used to downvote a question.

</details>

<details>
    <summary><strong>GET</strong> /ranking</summary>
    
This route should return the top 10 students ordered by the sum of the points from each question they've answered

**Obs**.: The parameter for the sorting is the quantity of up and downvotes.

**Obs**.: Sorts by `points`

```json
[
	{
		"name": "Vovo Juju",
		"answers": 8001,
		"points": 8001
	},
	{
		"name": "Vegeta",
		"answers": 12,
		"points": 12
	}
]
```
</details>

## How to run?

Run it locally following the steps bellow:

1. Clone this repository
2. Install dependencies
```bash
npm i
```
3. Open the repository's folder;
4. Open the file "database_backup.sql", then copy and paste the script on some database you'll create on your postgres terminal;

5. create an .env.dev file following the .env.example template using the credentials of the database you've created above;

6. Run the Back End with
```bash
npm start:dev
```

## Technologies I used

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## Get in touch!
[<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/pina-pedrolucas)
[![Gmail Badge](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:pedrolucaspina22@gmail.com)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/pedrolpin4/)
[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pedrolpin4)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://api.whatsapp.com/send?phone=5521967431453&text=Olá,%20meu%20amigo!)
