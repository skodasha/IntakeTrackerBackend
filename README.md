# Nozomi Full Stack Tech Task \[Backend\]

## Prerequisites

- Docker
- Docker compose plugin
- Node.js @20.x or higher
- Yarn package manager @1.x

## Environment variables overview

For env variables we use `.env` file which must be located in the project root folder<br>
Example of environment variables can be found in `.env.example` file in the project root folder

### Initial environment variables
|Name|Description|Example|
|-|-|-|
|PORT|API server port|8080|
|DB_USERNAME|Username for primary PostgreSQL server user|postgresql|
|DB_PASSWORD|Password for primary PostgreSQL server user|5432|
|DB_HOST|PostgreSQL server host|localhost|
|DB_PORT|PostgreSQL server port|5432|
|DB_NAME|Primary database for API server|mit|
|HASH_SALT|Hash salt for password hashing|10|
|ACCESS_TOKEN_SECRET|Secret for signing JWT|any-string|

## Database overview

**🚨 IMPORTANT 🚨**<br>
*Make sure all environment variables are set before running into this section*

**Database server** can be launched with docker<br>
docker-compose.db.yml file contains configuration for PostgreSQL 17.4<br>
It can be launched with following command
```sh
yarn db:start
```

Migration files for database can be found in `database/migrations` folder<br>
To run migrations execute following command
```sh
yarn db:migrate
```

## API server overview

API server has 3-layer architecture with following layers:
- Controller
- Service
- Repository

### Controller

The main purpose of controller is to handle request, validate it, process it using *service* and send response.

### Service

The main purpose of service is to handle business logic. It can perform calculations, contain logic which helps to achieve the goal, retrieve data using *repository*, etc.

### Repository

The main purpose of repository is to get data from any datasource. It cannot have any logic, it must only perform a request to datasource and return it.

## Entity organization & structure

We use dependency injection technique. All the instances are created in `main.js` file and passed to other instances.

To split the logic we use `modules` which usually defined by the logic or entity they handle.
