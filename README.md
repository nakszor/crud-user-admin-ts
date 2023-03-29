# express api

A simple REST API in Node.js

API Endpoints

| Methods     | Urls             | Description                  |
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

Create a postgreSql database.

Create the "users" table using the SQL codes on the file "createTable.sql"

Create the .env file.

Install the dependencies with: "yarn"

To start the express server, run: "yarn dev"

You can test all the routes by importing the InsomniaRoutes.json in your insomnia interface.
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


Route: GET /users/profile

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

Route: PATCH /users/:id

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

Route: DELETE /users/:id

Description:
Does a soft delete on the user account changing the key "active" to false. Only users with admin permission are allowed to desactivate other users accounts, regular users can desactivate their own accounts. 

Parameters:
- id (number): The ID of the user account to delete.

Headers:
- Authorization: A valid JWT token in the format "Bearer <token>"

Errors:
401 Unauthorized: if the user is not authenticated.
403 Forbidden: if the user is authenticated but does not have admin permission and it's trying to delete another user account.
409: when a user tries to desactivate an inactive user.
500 Internal Server Error: if an error occurred while retrieving the list of users.

Route: PUT /users/:id

Description:
Reactivate the user account changing the key "active" to true. Only users with admin permission are allowed to activate other user accounts. 

Parameters:
- id (number): The ID of the user account to activate.

Headers:
- Authorization: A valid JWT token in the format "Bearer <token>"

Errors:
401 Unauthorized: if the user is not authenticated.
403 Forbidden: if the user is authenticated but does not have admin permission and it's trying to delete another user account.
409: when a user tries to desactivate an inactive user.
500 Internal Server Error: if an error occurred while retrieving the list of users.

Route: POST /login

Description:
This route authenticate the users and return a JWT token so they can acess the service. It expects a JSON object containing the user's email and password in the request body. 

Example of Request Body to create a regular user (without admin permission):

{
  "email": "teste@mail.com",
  "password": "1234"
}

Return:

{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjc5OTYzNTk3LCJleHAiOjE2Nzk5NjcxOTcsInN1YiI6IjEifQ.LnmqG53i4gHMEU7p1_GfxU1sBXTLuyAC9fdyRzc5S8E"
}


Errors
400 Bad Request: if the request body does not contain the right data types.
401 Unauthorized: if the user tries to login with wrong password/email or if it is an inactive user. 
500 Internal Server Error: if an error occurred while retrieving the list of users.
