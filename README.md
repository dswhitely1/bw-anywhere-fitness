# anytimefitness v1.0.0

AnyTime Fitness for Lambda&#39;s Build Week API Repository

- [Auth](#auth)
	- [Logs an User In](#logs-an-user-in)
	- [Registers a New User](#registers-a-new-user)
	


# Auth

## Logs an User In

<p>Logs an User In</p>

	POST /api/auth/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>Username of the User</p>							|
| password			| String			|  <p>Password of the User</p>							|

### Success Response

Success-Response:

```
{
"message": "Welcome back don!",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzE2MTI3MjcsImV4cCI6MTU3MTY5OTEyN30.FKIekAwXBPHRAf6ImjKHM_rKN9GrqLHcXMrpD4RpIB0",
"user": {
  "id": 3,
  "firstName": null,
  "lastName": null,
  "email": null,
  "username": "don",
  "created_at": "2019-10-20T22:59:45.794Z",
  "updated_at": "2019-10-20T22:59:45.794Z",
  "roleId": 1
}
}
```
### Error Response

Username-Not-Found-Response

```
{
     "message": "Username is not in the system."
}
```
Incorrect-Password

```
{
     "message": "Incorrect Password"
}
```
## Registers a New User

<p>Registers a New User</p>

	POST /api/auth/register


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>The New Users username *Required</p>							|
| password			| String			|  <p>The New Users password *Required</p>							|
| firstName			| String			|  <p>The New Users first name</p>							|
| lastName			| String			|  <p>The New Users last name</p>							|
| email			| String			|  <p>The New Users email</p>							|
| roleId			| Integer			|  <p>The Users Role, 1 for Instructor, 2 for Client *Required</p>							|

### Success Response

Success-Response:

```
{
 "id": 3,
 "firstName": null,
 "lastName": null,
 "email": null,
 "username": "don",
 "created_at": "2019-10-20T22:59:45.794Z",
 "updated_at": "2019-10-20T22:59:45.794Z",
 "roleId": 1
}
```
### Error Response

Username-Already-Taken

```
{
     "message": "Username is already taken"
}
```

