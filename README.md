# basic-nest-api

## Description
This is a very simple CRUD API made with mongoose + NestJS. Also, it works in a pretty similar way to [basic-flask-api](https://github.com/End313234/basic-flask-api "basic-flask-api"): from the moment that the application is started, the user can register a new account (since there's not another one with the same email address), update his account (like update the password, username, email), make login (this one would be a nice feature to a possible web application implementing this API, btw I've already did something like that before [here](https://github.com/End313234/basic-flask-api/tree/main/src/website), but it's not completed yet). The user can also see every user registered and all the information about he, except by the `user_id`.

## Running
To run the API, you have only to type the following command (yarn):
```
yarn run start
```
If everything run successfully, then you have access to the API. You can make a wrapper based on this API to play with it a little bit since it's a basic nest api (as the name suggests) and there's not many things that you can do with it. If you only want test the API, you can use softwares like [Insomnia](https://insomnia.rest/download).

## Documentation

For a while, the base URL used on every endpoint is `http://localhost:300` and the body of every endpoint is in JSON format.

### Create User
**Endpoint**: `POST /users`

This endpoint creates an user on the database, for using it you have to provide a `name`, `email` and `password`. <br>
Example:
```json
{
    "name": "end",
    "email": "end@example.com",
    "password": "This is my secret password"
}
```
The fields have no criteria, so you can provide whatever you want. I want to change this in the future.

### Make Login
**Endpoint**: `PATCH /users`
This endpoint simply simulate a kind of login, so it verify if you does exist on database and returns something based on it. For using this endpoint, you have to provide your `email` and `password`. <br>
Example:
```json
{
    "email": "end@example.com",
    "password": "This is my secret password"
}
```

### Update User
**Endpoint**: `PUT /users`
This endpoints change some information about the user provided, you can change the email, password or username. For using this endpoint, you have to provide your `email`, `password`, the `infoToUpdate` and the `newInfo`, which is the new value of the field provided on `infoToUpdate`. <br>
Example:
```json
{
    "email": "end@example.com",
    "password": "This is my secret password",
    "infoToUpdate": "username",
    "newInfo": "end2"
}
```
Supposing that old info used to be "end", now it would be "end2"

### Get All Users
**Endpoint**: `GET /users/all`

This endpoint returns every user and every information about them, except by their `user_id` and `password`. For using it, you have to provide your `email` and `password`. <br>
Example:
```json
{
    "email": "end@example.com",
    "password": "This is my secret password"
}
```

### Get Specific User
**Endpoint**: `GET /users`
This endpoint returns all information about the specified user, except by his `user_id` and `password`. For use this endpoint, you have to provide a `username`, your `email` and `password`. <br>
Example:
```json
{
    "username": "end",
    "email": "end@example.com",
    "password": "This is my secret password"
}
```
In this case, the API should return informations about the user "end".


### Delete User
**Endpoint**: `DELETE /users`

This endpoint deletes an user from the database and every info related to him. For using it you have to provide you `email` and `password`. <br>
Example:
```json
{
    "email": "end@example.com",
    "password": "This is my secret password"
}
```

### Create List Item
**Endpoint**: `PUT /users/todo`

This endpoint add an item to user's todo list and return the new todo list, the same can be seen by other users. For using this endpoint, you have to provide an `itemName`, an `itemDescription`, your `email` and your `password`.
Example:
```json
{
    "email": "end@example.com",
    "password": "This is my secret password",
    "itemName": "study for my test",
    "itemDescription": "test'll be happening on tuesday at 10:00am"
}
```

### Delete Item List
**Endpoint**: `DELETE /users/todo`
This endpoint deletes an item from the todo list and returns the new todo list. For using it, you have to provide the `itemName`, you `email` and `password`. <br>
Example:
```json
{
    "email": "end@example.com",
    "password": "This is my secret password",
    "itemName": "study for my test"
}
```


## Updates

### 0.0.1
First release.
### 0.0.2
This commit brings to the API a todo list for every user, this one is also acessible by making an request to an specific user or getting all users.
I also migrated to mongoose because TypeORM isn't the best option to NoSQL databases, then I start using mongoose because it's a nice ODM that I've already used before.