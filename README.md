# Anytime Fitness v1.0.0

Backend Project for Lambda&#39;s Build Week API Repository

- [Auth](#auth)
	- [Logs an User In](#logs-an-user-in)
	- [Registers a New User](#registers-a-new-user)
	
- [Categories](#categories)
	- [Deletes Category based on provided Id](#deletes-category-based-on-provided-id)
	- [Returns all categories](#returns-all-categories)
	- [Add New Category](#add-new-category)
	- [Updates Category based on provided Id](#updates-category-based-on-provided-id)
	
- [Classes](#classes)
	- [Deletes Class based on provided Id](#deletes-class-based-on-provided-id)
	- [Returns all classes](#returns-all-classes)
	- [Add New Class](#add-new-class)
	- [Updated Class with provided Id](#updated-class-with-provided-id)
	
- [User](#user)
	- [Updates the Current Logged In User](#updates-the-current-logged-in-user)
	- [Deletes the Current Logged In User](#deletes-the-current-logged-in-user)
	- [Retrieve all Classes that the Current User is signed up for](#retrieve-all-classes-that-the-current-user-is-signed-up-for)
	- [Signs the User up for the Provided Class Id](#signs-the-user-up-for-the-provided-class-id)
	


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
# Categories

## Deletes Category based on provided Id



	DELETE /api/category/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| integer			|  <p>The ID is passed in the URL</p>							|

## Returns all categories



	GET /api/category


### Success Response

Success-Response:

```
[
{
  "id": 1,
  "name": "Pilates",
  "description": null,
  "created_at": "2019-10-20T22:59:34.197Z",
  "updated_at": "2019-10-20T22:59:34.197Z"
},
{
  "id": 2,
  "name": "Yoga",
  "description": null,
  "created_at": "2019-10-20T22:59:34.197Z",
  "updated_at": "2019-10-20T22:59:34.197Z"
},
{
  "id": 3,
  "name": "Lagree",
  "description": null,
  "created_at": "2019-10-20T22:59:34.197Z",
  "updated_at": "2019-10-20T22:59:34.197Z"
},
{
  "id": 4,
  "name": "Barre",
  "description": null,
  "created_at": "2019-10-20T22:59:34.197Z",
  "updated_at": "2019-10-20T22:59:34.197Z"
},
{
  "id": 5,
  "name": "Spin",
  "description": null,
  "created_at": "2019-10-20T22:59:34.197Z",
  "updated_at": "2019-10-20T22:59:34.197Z"
},
{
  "id": 6,
  "name": "Zumba",
  "description": null,
  "created_at": "2019-10-20T22:59:34.197Z",
  "updated_at": "2019-10-20T22:59:34.197Z"
}
]
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
## Add New Category



	POST /api/category


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  <p>Category Name *Required</p>							|
| description			| String			|  <p>Description of the Category</p>							|

### Success Response

Success-Response:

```
{
 "id": 9,
 "name": "Test Category2",
 "description": null,
 "created_at": "2019-10-21T01:19:39.287Z",
 "updated_at": "2019-10-21T01:19:39.287Z"
}
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
BadRequest-Response

```
{
     "message": "The Category Name: ${req.body.name} is already taken"
}
```
## Updates Category based on provided Id



	PUT /api/category/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Integer			|  <p>The ID is passed in the URL</p>							|
| name			| String			|  <p>Category Name *Required</p>							|
| description			| String			|  <p>Description of the Category</p>							|

### Success Response

Success-Response:

```
{
  "id": 7,
  "name": "Test Category",
  "description": "Testing Update Router",
  "created_at": "2019-10-21T01:17:05.085Z",
  "updated_at": "2019-10-21T01:17:05.085Z"
}
```
# Classes

## Deletes Class based on provided Id



	DELETE /api/classes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| integer			|  <p>The ID is passed in the URL</p>							|

## Returns all classes



	GET /api/category


### Success Response

Success-Response:

```
[
 {
   "id": 1,
   "title": "Yoga",
   "instructorId": 1,
   "categoryId": 1,
   "scheduleTime": null,
   "address": null,
   "city": null,
   "state": null,
   "zipCode": null,
   "created_at": "2019-10-21T12:51:44.173Z",
   "updated_at": "2019-10-21T12:51:44.173Z"
 },
 {
   "id": 2,
   "title": "Water Aerobics",
   "instructorId": 1,
   "categoryId": 2,
   "scheduleTime": null,
   "address": null,
   "city": null,
   "state": null,
   "zipCode": null,
   "created_at": "2019-10-21T12:51:44.173Z",
   "updated_at": "2019-10-21T12:51:44.173Z"
 }
]
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
## Add New Class



	POST /api/category


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| String			|  <p>Class Title *Required</p>							|
| instructorId			| Integer			|  <p>The Id of the Instructor *Required</p>							|
| categoryId			| Integer			|  <p>The Id of the Category *Required</p>							|
| scheduleTime			| Date			|  <p>The Date and Time of the class</p>							|
| address			| String			|  <p>The Street Address of the class</p>							|
| city			| String			|  <p>The City of the class</p>							|
| state			| String			|  <p>The State of the class</p>							|
| zipCode			| String			|  <p>The ZipCode fo the class</p>							|

### Success Response

Success-Response:

```
{
 "id": 3,
 "title": "A New Class",
 "instructorId": 1,
 "categoryId": 1,
 "scheduleTime": null,
 "address": null,
 "city": null,
 "state": null,
 "zipCode": null,
 "created_at": "2019-10-21T13:23:39.281Z",
 "updated_at": "2019-10-21T13:23:39.281Z"
}
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
## Updated Class with provided Id



	PUT /api/classes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| String			|  <p>Class Title *Required</p>							|
| instructorId			| Integer			|  <p>The Id of the Instructor *Required</p>							|
| categoryId			| Integer			|  <p>The Id of the Category *Required</p>							|
| scheduleTime			| Date			|  <p>The Date and Time of the class</p>							|
| address			| String			|  <p>The Street Address of the class</p>							|
| city			| String			|  <p>The City of the class</p>							|
| state			| String			|  <p>The State of the class</p>							|
| zipCode			| String			|  <p>The ZipCode fo the class</p>							|

### Success Response

Success-Response:

```
{
 "id": 3,
 "title": "An Updated Class",
 "instructorId": 1,
 "categoryId": 1,
 "scheduleTime": null,
 "address": null,
 "city": null,
 "state": null,
 "zipCode": null,
 "created_at": "2019-10-21T13:23:39.281Z",
 "updated_at": "2019-10-21T13:23:39.281Z"
}
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
# User

## Updates the Current Logged In User

<p>Updates the current logged in user</p>

	PUT /api/user


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>The Users username</p>							|
| password			| String			|  <p>The Users password</p>							|
| firstName			| String			|  <p>The Users first name</p>							|
| lastName			| String			|  <p>The Users last name</p>							|
| email			| String			|  <p>The Users email</p>							|
| roleId			| Integer			|  <p>The Users Role, 1 for Instructor, 2 for Client</p>							|

### Success Response

Success-Response:

```
{
 "id": 3,
 "firstName": "Donald",
 "lastName": null,
 "email": null,
 "username": "don",
 "created_at": "2019-10-20T22:59:45.794Z",
 "updated_at": "2019-10-20T22:59:45.794Z",
 "roleId": 1
}
```
## Deletes the Current Logged In User

<p>Deletes the current logged in user</p>

	DELETE /api/user


### Success Response

Success-Response:

```
1
```
## Retrieve all Classes that the Current User is signed up for

<p>Retrieves the Current Users Signed up Classes</p>

	GET /api/user/classes


## Signs the User up for the Provided Class Id

<p>Signs an user up for a class based on the provided class Id</p>

	POST /api/user/classes/:id



