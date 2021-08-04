# basic-nest-api

## Description
This is a very simple CRUD API made with TypeORM + NestJS. Also, it works in a pretty similar way to [basic-flask-api](https://github.com/End313234/basic-flask-api "basic-flask-api"): from the moment that the application is started, the user can register a new account (since there's not another one with the same email address), update his account (like update the password, username, email), make login (this one would be a nice feature to a possible web application implementing this API, btw I've already did something like that before [here](https://github.com/End313234/basic-flask-api/tree/main/src/website), but it's not completed yet). The user can also see every user registered and all the information about he, except by the `user_id`.

## Running
To start running your application, you have to clone this repository and then run the following command with yarn:
```
yarn run migration:run
```
After this, check if you haven't any fatal error on your terminal and run the application by running the following command (with yarn):
```
yarn run start
```
If everything run successfully, then you have access to the API. You can make a wrapper based on this API to play with it a little bit since it's a basic nest api (as the name suggests) and there's not many things that you can do with it. If you only want test the API, you can use softwares like [Insomnia](https://insomnia.rest/download).