<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is an backend application using NestJS with TypeORM and Postgres. In this project, i used jwt token for user authentication, i used role based authorization.In addition, email handling was done.

## Project setup

```bash
#first environment setup:
$ npm i -g @nestjs/cli
#now give porject name:
$ nest new event-buddy
```
## Install necessary packages
```bash
# Install node.js packages
$ npm install

# install packages for validation
$ npm i --save class-validator class transformer

# Install packages for hashing
$ npm i bcrypt
$ npm i -D @types/bcrypt

# For email handling
$ npm install --save @nestjs-modules/mailer nodemailer
$ npm install --save-dev @types/nodemailer

# For using .env file
$ npm install @nestjs/config

# JWT token for authentication
$ npm install --save @nestjs/jwt passport-jwt
$ npm install --save-dev @types/passport-jwt
$ npm install @nestjs/passport
$ npm install passport

# For using typeorm
$ npm install --save @nestjs/typeorm typeorm

# For API documentation using Swagger
$ npm install --save @nestjs/swagger swagger-ui-express

# To run Swagger
$ localhost:3000/api
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
## Environment variable

```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=yourgmail
EMAIL_PASSWORD=your app password
JWT_SECRET_KEY=useyoursecretkey
JWT_EXPIRES=1h

```






