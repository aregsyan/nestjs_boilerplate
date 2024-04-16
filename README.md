# NestJS Boilerplate

## Description

NestJS Boilerplate

## Local Setup

### Installation

```bash
npm install
```

### Running the app

```bash
### with docker
$ docker compose up --build

# without docker. Please set corresponding mongouri
### Make sure you have `mongo` running on your system

$ npm start:dev or npm start:debug
```

Application is served at

```bash
http://localhost:8080
```

## Docs

```bash
http://localhost:8080/api/docs
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

## Logging

### Trace ID

For incoming request, it is tagged with trace ID, with specific format, to make it easier for debugging and following request trail

### Naming

- Directory name must be `singular` with `kebab-case`
- File name must be `kebab-case` and should be `singular`, example exception is `types.ts`

### Modules/Models

- BaseEntity
- MyExampleEntity

#### Documentations

Access to docs

````
{{Host}}/api/docs
````

## License

`UNLICENSED`.
