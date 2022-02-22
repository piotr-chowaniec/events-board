# Events board 📆

## Demo

You can access demo [here](https://events-board-app.herokuapp.com/)

By default, all users can view all published events at a home page as well as event details.

Once you've registered, you'll be able to submit/resign your participation in the event by clicking `Going`/`not Going` button at event details view. 

As a logged in user you'll be able to manage your profile data, as well as create your own events, manage their details and photos. By default, newly created event won't be visible to wider audience until you decide to publish it by clicking `publish` button at event details view.


There is also an `admin` functionality that allows to manage users, events and participations in the system. In order to log in as admin use this credentials:

```
email: admin@events.com
password: notSoSecretPassword
```

🚨🚨🚨
**It's a demo app so please be aware to use non-existing data such as email, first and last name, since everyone reading this readme have access to it with admin credentials.**

Feel free to play with it 🙏.

## Technologies used
- [Node.js v16.10](https://nodejs.org) - Check allowed functionalities for this version of Node on [node.green](http://node.green/)
- [Typescript v4](https://www.typescriptlang.org/)
- [NestJs v8.3](https://nestjs.com/) -  Web server
- [PostgreSQL v14](https://www.postgresql.org/) - DB
- [Prisma v3.9](https://www.prisma.io/) - DB ORM
- [React v17](https://reactjs.org/) - UI library
- [Redux](http://redux.js.org/docs/basics/UsageWithReact.html) – UI state management
- [React Router v6](https://reactrouter.com/docs/en/v6) –  UI routing
- [React Bootstrap v5](https://react-bootstrap.github.io/) – CSS Framework
- [Formik](https://formik.org/) - Forms framework
- [Axios](https://github.com/axios/axios) – Client-side requests handler
- [Yup](https://github.com/jquense/yup) - Object schema validator
- [Passport](http://www.passportjs.org/) - Authentication with local strategy (email and password). Authorization with jwt token.
- [Docker](https://docker.com) - for development purposes
- [Cypress](https://www.cypress.io/) - for e2e tests

## Tools Used

- [ESLint](https://eslint.org/) - static code analysis for JS/TS files
- [Prettier](https://prettier.io/) - code formatter
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - override user/workspace settings with settings found in `.editorconfig` files

## Documentation

This project includes code for both Node server (`/server`) and Client app (`/client`).

There are some common things which both API and UI uses which are separated to `/commonPackages` packages.

### Node version

Events Board app is developed using Node 16.10. To set the correct version you can use [nvm](https://github.com/creationix/nvm) and just run `nvm use` in the project root directory. The command will use `.nvmrc` file to set proper Node version.

### Database

Events Board app is running with PostgreSQL database and Prisma ORM. In order to connect to DB you need to provide config environment variable:

```
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public&sslmode=prefer

```

It's highly recommended to work locally using local DB instance. For that purpose you can provide development environment variables which you want PostgreSQL to be initializes with:

```
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
POSTGRES_HOST
POSTGRES_PORT
```

You can also seed database instance for development by running:
```
npm run db:seed
```
Make sure to not run it at production instance though!

### Cloudinary

Events Board app stores uploaded profile and event pictures at [Cloudinary](https://cloudinary.com/). In order to connect to cloud you need to provide config environment variables:

```
CLOUDINARY_CLOUD_NAME
CLOUDINARY_CLOUD_FOLDER
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

### Running the app in development mode

First, make sure that you completed the following steps:
- [You use a correct node version](#node-version).
- [Provide DB config environment variable values](#database)
- [Provide Cloudinary config environment variable values](#cloudinary)

Then install NPM packages by running the following command in project root directory:
```
npm run install:all
```

Now you can start application by typing:

```
npm run start:dev
```

### Docker

You can either run application with already existing PostgreSQL instance to which you have access to (start with `npm run start:dev`), or running `PostgreSQL v14` docker image in parallel with Events Board taking advantage of docker containers. 
You can do so by running docker-compose command:

```
docker-compose -f docker-compose.yml -p events-board up -d
```

In order to stop containers type:

```
docker-compose -f docker-compose.yml -p events-board down
```

To get access to docker debug logs type:

```
docker-compose logs -f
```

If you wish to persist local DB data between development sessions you can run it with additional docker-compose file:

```
docker-compose -f docker-compose.yml -f docker-compose.db-volume.yml -p events-board up -d
```

### Tests

##### Unit and Integration

There are unit and integration tests defined for server and client code.
To run them you just type at project root level:

```
npm run test
```

##### E2E

You can also execute e2e tests of whole application which are written using cypress. In order to do so you first have to ensure application is running and you have access to testing instance of database. You can run docker-compose to achieve that - follow [docker](#docker) docs.

Then you'll have to define testing env file `.env.test` in which you'll have to define Prisma database environment variable:

```
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public&sslmode=prefer

```

It should be mostly the same as previously defined in `.env` with a difference for `POSTGRES_HOST` value. Since docker networking uses container names for DHCP, accessing it the same way from outside of docker network won't work. You'll have to define it as `POSTGRES_HOST='localhost'` instead.

Then type in root level either of following:
```
npm run test:ui // which runs cypress tests in headless mode
npm run test:cypress // which opens cypress tools
```
