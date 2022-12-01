# NestJS Starter

## Description

- Starter kit for nest js based projects.
- Basic authentication microservice consisting of
  - [x] Authentication - JWT and cookies
  - [ ] Authorization - RBAC
  - [x] DB Migrations using Sequelize
  - [x] Application Logging using Winston
  - [x] HTTP logging using Interceptors
  - [x] Swagger Documentation
  - [x] Docker and docker-compose
  - [x] Environment Configuration
  - [x] Guards
  - [x] Validations
  - [x] Http Clients
  - [x] Masking PII
  - [x] Unit testing
- Note: This is a boilerplate. For production readiness, cater the implementations according to the requirements

## Installation

```bash
$ npm install
```

## Environment setup

Run postgres using docker
```sh
docker run --name demo-postgres -e POSTGRES_PASSWORD=pass1234 -p5432:5432 -e PGDATA=/var/lib/postgresql/data/pgdata -v /~/Documents/docker:/var/lib/postgresql/data -d postgres
```

```bash
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
