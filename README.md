# Shopping System (fastify_shopping_api)
A BackStage Api for Shopping System.

## Contents
- [System Requirement](#system-requirement)
- [Steps of installation](#steps-of-installation)
- [Available Scripts](#available-scripts)
- [Docker Deployment](#docker-deployment)
- [Folder Definition](#folder-definition)
- [Folder Structure](#folder-structure)

## System Requirement
### Software
- **Database**
    - [SQLite](https://sqlite.org/index.html)：v3.40.0
- **Dependencies**
    - [node.js](https://nodejs.org/en/)：v20.9.0
    - [npm](https://www.npmjs.com/)：v10.2.2
    - [fastify](https://www.fastify.io/)：v4.24.3
    - [prisma](https://www.prisma.io/)：v5.2.0
    - [@prisma/client](https://www.prisma.io/docs/concepts/components/prisma-client)：v5.2.0
- **Test**
    - [jest](https://jestjs.io/)：v29.7.0
    - [Postman](https://www.postman.com/)：v10.19.7
- **DevOps**
    - [Docker](https://www.docker.com/)：v20.10.18

## Steps of installation
### Environment Variable Setting
Reference the file `.env.example` and add `.env` into the root of project.
#### `cat > .env`

### Execute the migration
Create tables in the database.
#### `npm run migration:run`

### Generate Prisma Client
#### `npx prisma generate --schema=./prisma/schema.prisma`

### Install Dependencies
#### `npm install`

## Available Scripts
In the project directory, you can run:

### To start the app in dev mode
#### `npm run dev`
Open `http://${process.env.IP_ADDRESS}:${process.env.PORT}` to view it in the browser.\
ex：[http://127.0.0.1:3000](http://127.0.0.1:3000)

### For production mode
#### `npm start`

### Run the test cases
#### `npm run test`

### Generate the migration
#### `npm run migration:generate YourMigration`
ex：`npm run migration:generate Init`\

### Execute the migration
#### `npm run migration:run`

## Docker Deployment
### Cd to the Deployment Folder
#### `cd /home/fastify_shopping_api`

### Clone the project
#### `git clone https://github.com/singyichen/fastify_shopping_api.git`

### Add `.env` into project

### Create folders for the logs and grant permissions to the folders
According to the script for volume mount `-v /var/log/fastify_shopping_api:/src/logs`. The following are steps for creation.
#### 1. `cd /var/log/fastify_shopping_api`
#### 2. `sudo mkdir error info`
#### 3. `sudo chmod 777 error info`

### Build Docker Image
#### `docker build -t fastify_shopping_api:1.0.0 --no-cache .`

### Run Docker Container
#### `docker run -d --name fastify_shopping_api -p 3000:3000 --restart=always -v /var/log/fastify_shopping_api:/src/logs -v /home/mis/fastify_shopping_api/.env:/src/.env fastify_shopping_api:1.0.0`

### When `.env` is updated, should restart docker container
#### `docker restart <container-name>`

## Folder Definition
- **config**
    - Config files for casbin

- **logs**
    - Logger files for info and error

- **prisma/schema.prisma**
    - Table schema provided by prisma

- **prisma/migrations**
    - Migrations for create data table

- **src/api**
    - Usage of api for project

- **src/base**
    - Modular code placement for project calls

- **src/casbin**
    - Permission config for ABAC/RBAC

- **src/modules**
    - API for all modules, include controller and service and validator

- **src/ormService**
    - Client service for prisma

- **src/plugin**
    - Plugin for framework Fastify

- **src/routes**
    - API routes

- **src/utils**
    - Contains utility modules that can be used across project

- **test**
    - Unit tests for api and plugin

## Folder Structure
```
│  .dockerignore
│  .env
│  .env.example
│  .eslintrc.json
│  .gitignore
│  .prettierignore
│  .prettierrc.json
│  app.js
│  dockerfile
│  jest.config.js
│  package-lock.json
│  package.json
│  README.md
│  sqlite.db
│
├─config
│    casbinConfig.js
│    
├─logs
│  ├─error
│  │      
│  └─info
│
├─prisma
│  └─  schema.prisma
│
├─src
│  ├─api
│  │      dateTimeApi.js
│  │      
│  ├─base
│  │      base.controller.js
│  │      base.response.js
│  │      base.result.js
│  │
│  ├─casbin
│  │  ├─abac
│  │  │   abac_model.conf    
│  │  │   abac_policy.csv
│  │  │
│  │  └─rbac
│  │      rbac_model.conf    
│  │      rbac_policy.csv 
│  │      
│  ├─modules
│  │  └─public
│  │     ├─basic
│  │     │  ├─controller
│  │     │  │      loginController.js
│  │     │  │      logoutController.js
│  │     │  │      
│  │     │  ├─service
│  │     │  │      logoutService.js
│  │     │  │      verificationService.js
│  │     │  │      
│  │     │  └─validator
│  │     │          login.js
│  │     │          logout.js
│  │     │          verifyJWT.js
│  │     │
│  │     ├─customer
│  │     │  ├─controller
│  │     │  │      customerController.js
│  │     │  │      
│  │     │  ├─service
│  │     │  │      customerService.js
│  │     │  │      
│  │     │  └─validator
│  │     │          customer.js
│  │     │          deleteCustomer.js
│  │     │          findAllCustomer.js
│  │     │          findOneCustomer.js
│  │     │
│  │     ├─order
│  │     │  ├─controller
│  │     │  │      orderController.js
│  │     │  │      
│  │     │  ├─service
│  │     │  │      orderService.js
│  │     │  │      
│  │     │  └─validator
│  │     │          order.js
│  │     │          deleteOrder.js
│  │     │          findAllOrder.js
│  │     │          findOneOrder.js
│  │     │
│  │     ├─orderItem
│  │     │  ├─controller
│  │     │  │      orderItemController.js
│  │     │  │      
│  │     │  ├─service
│  │     │  │      orderItemService.js
│  │     │  │      
│  │     │  └─validator
│  │     │          orderItem.js
│  │     │          deleteOrderItem.js
│  │     │          findAllOrderItem.js
│  │     │          findOneOrderItem.js
│  │     │
│  │     ├─permissions
│  │     │  ├─controller
│  │     │  │      permissionsController.js
│  │     │  │      
│  │     │  ├─service
│  │     │  │      permissionsService.js
│  │     │  │      
│  │     │  └─validator
│  │     │          addPermissionForUser.js
│  │     │          addRoleForUser.js
│  │     │          deletePermissionForUser.js
│  │     │          deleteRoleForUser.js
│  │     │          getPermissionsForUser.js
│  │     │          getUsersForRole.js
│  │     │
│  │     ├─product
│  │     │  ├─controller
│  │     │  │      productController.js
│  │     │  │      
│  │     │  ├─service
│  │     │  │      productService.js
│  │     │  │      
│  │     │  └─validator
│  │     │          product.js
│  │     │          deleteProduct.js
│  │     │          findAllProduct.js
│  │     │          findOneProduct.js
│  │     │
│  │     └─user
│  │        ├─controller
│  │        │      userController.js
│  │        │      
│  │        ├─service
│  │        │      userService.js
│  │        │      
│  │        └─validator
│  │                user.js
│  │                deleteUser.js
│  │                findAllUser.js
│  │     │          findOneUser.js
│  │                updateOneUser.js
│  │
│  ├─ormService
│  │      prismaClientService.js
│  │      
│  ├─plugin
│  │      casbin.js
│  │      cors.js
│  │      enforcer.js
│  │      env.js
│  │      jwt.js
│  │      logger.js
│  │      router.js
│  │      
│  ├─routes
│  │  │  root.js
│  │  │  
│  │  └─api
│  │     │  
│  │     └─admin
│  │        ├─basic
│  │        │      basic.js
│  │        │
│  │        ├─customer
│  │        │      customer.js
│  │        │
│  │        ├─order
│  │        │      order.js
│  │        │
│  │        ├─orderItem
│  │        │      orderItem.js
│  │        │
│  │        ├─permissions
│  │        │      permissions.js
│  │        │
│  │        ├─product
│  │        │      product.js
│  │        │      
│  │        └─user
│  │               user.js
│  │      
│  ├─utils
│  │      errorInfo.js
│  │      sharedObject.js
│  └─     url.js
│
└─test
    │  config.js
    │  root.test.js
    │  
    └─unit
        │
        └─api
            │
            └─api
                   dateTimeApi.test.js            
```
