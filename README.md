# express api

A simple REST API in Node.js

API Endpoints

| Methods     | Urls             |Description                   |
| ----------- | -----------      | -----------                  |
| GET         | /users           |Get all users                 |
| GET         | /users/profile   |Get a specific user           |
| POST        | /users           |Create a new user             |
| PATCH       | /users/:id       |Update an existing user       |
| DELETE      | /users/:id       |SoftDelete an existing user   |
| PUT         | /users/:id       |Reactivate a deleted user     |
| POST        | /login           |Authenticate an existing user |

## Quick Start

Clone the repository.

```bash
https://github.com/nakszor/crud-user-admin-ts
cd crud-user-admin-ts
```
Create a postgreSql database.

Create the "users" table using the SQL codes on the file "createTable.sql"

Create the .env file.

Install the dependencies.

```bash
yarn
```
To start the express server, run:

```bash
yarn dev
```
## EndPoints 

Route: GET /users

This endpoint retrieves a list of all users from the service. 

Headers:
- Authorization: A valid JWT token in the format "Bearer <token>"


[
	{
		"name": "userteste",
		"email": "teste@mail.com",
		"admin": true,
		"id": 1,
		"active": true
	},
	{
		"name": "anotheruser",
		"email": "anotheruser@mail.com",
		"admin": false,
		"id": 2,
		"active": true
	}
]

Permissions
This endpoint can only be accessed by users with admin permission.

Errors
401 Unauthorized: if the user is not authenticated.
403 Forbidden: if the user is authenticated but does not have admin permission.
500 Internal Server Error: if an error occurred while retrieving the list of users.


Route: GET users/profile

Description:
This route retrieves the profile information of a user who is currently logged in. The route is protected and can only be accessed by users who have a valid JSON Web Token (JWT). 

Headers:
- Authorization: A valid JWT token in the format "Bearer <token>"

Returns:

{
	"name": "userteste",
	"email": "teste@mail.com",
	"admin": true,
	"id": 1,
	"active": true
}

Errors
401 Unauthorized: if the user is not authenticated.
500 Internal Server Error: if an error occurred while retrieving the list of users.

Route: POST /users

Description:
This route creates a new user account. It expects a JSON object containing the user's information in the request body. 

Example of Request Body to create a regular user (without admin permission):

{
  "name": "userteste",
  "email": "teste@mail.com",
  "password": "1234"
}

Return:

{
	"name": "userteste",
	"email": "teste@mail.com",
	"admin": false,
	"id": 1,
	"active": true
}

Example of request body to create a user with admin permission: 

{
  "name": "2",
  "email": "teste@mail.com",
  "password": "1234",
  "admin": true
}

Return:

{
	"name": "userteste",
	"email": "teste@mail.com",
	"admin": true,
	"id": 1,
	"active": true
}

Errors
400 Bad Request: if the request body does not contain the right data types.
409 Conflict: if the user tries to register an email that already exists on the database. 
500 Internal Server Error: if an error occurred while retrieving the list of users.

Route: PATCH /:id

Description:
This route updates a user's account information. It expects a JSON object containing the updated user information in the request body. Infos that can be update: the email, the name and the password. A regular user can only update his own information, a user with admin permission can update information of every user on the database.

Parameters:
- id (number): The ID of the user account to update.

Headers:
- Authorization: A valid JWT token in the format "Bearer <token>"


Example of request body:

{
	"email":"dale2@mail.com"
}

Return:

{
	"name": "userteste",
	"email": "dale2@mail.com",
	"admin": true,
	"id": 1,
	"active": true
}

Errors:
400 Bad Request: if the request body does not contain the right data types.
401 Unauthorized: if the user is not authenticated.
403 Forbidden: if the user is authenticated but does not have admin permission and it's trying to update another user info.
409 Conflict: if the user tries to update his email to an email that already exists on the database. 
500 Internal Server Error: if an error occurred while retrieving the list of users.


