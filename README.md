# DEX API Demo

## Overview

Demo of the financial platform with token trading support via integration with the Raydium DEX.

## Prerequisites

- Node.js
- Package manager (e.g. yarn or npm)
- DBMS (e.g. PostgreSQL)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/prog-plus/dex-api-demo.git
   cd dex-api-demo
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```
   or 
   ```bash
   npm install
   ```
3. Set up environment variables by creating ```.env``` file from ```.env.template```. All variables are required.

4. Prepare database (create tables and insert initial data):
   ```bash
   yarn prepare_db
   ```
   or
   ```bash
   npm run prepare_db
   ``` 

## Run API server
```bash
yarn start
```
or 
```bash
npm start
```


## Run unit tests
```bash
yarn test
```
or 
```bash
npm test
```

## View documentation
Open your browser and navigate to http://localhost:5000/docs (use the port you have configured).
