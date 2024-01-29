# Description
This is a web application for a prompt response logging system. It consists of a proxy layer which: 
1. Queries OpenAI and returns the response to the user.
2. Logs the request to Clickhouse database along with relevant metadata.
3. Shows the requests and other related statistics on a dashboard.

TODO: Add more filters with statistics such as total failures, average latency, p95 latency, tokens per second etc. on the UI.

# Tech Stack
1. Backend Server:- TypeScript and [NestJS](https://github.com/nestjs/nest)
2. Database:- [ClickHouse](https://clickhouse.com/docs)
3. Frontend (Query page and Dashboard):- [Streamlit](https://docs.streamlit.io)
4. API:- [OpenAI](https://platform.openai.com/docs)

# Getting Started

### 1. Install NestJS
```bash
$ npm install
```

### 2. Install Streamlit
```bash
$ pip install streamlit
```

### 3. Start the NestJS server
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### 4. Run the Streamlit application
```bash
$ streamlit run app_name.py
```

### 5. Install and setup ClickHouse

### 6. Setup `.env` file
Make sure your .env file contains all the necessary API keys. I have provided an example with sample keys.

# About ClickHouse
[ClickHouse](https://clickhouse.com/docs) is an SQL database.

# About Streamlit
[Streamlit](https://docs.streamlit.io) is an open-source Python framework for web applications.

# About NestJS

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
</p>