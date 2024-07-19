# UnifiSolutions Task
Welcome to Magic Transporters, the future of moving things easily. These super cool
transporters, powered by virtual magic, are here to make shipping stuff a breeze.

## API deployed URL:
[--> visit](https://unifisolutions.onrender.com/)


## API ROUTES:
- /api/movers <br />
  method: get <br />
  desc: get all movers documents <br />

- /api/items <br />
  method: get <br />
  desc: get all items documents <br />

- /api/addMover <br />
  method: Post <br />
  desc: add new Mover <br />
  requset body: <br />
  { <br />
    "weightlimit": 1900 <br />
  } <br />

- /api/addItem <br />
  method: Post <br />
  desc: add new Item <br />
  requset body: <br />
  { <br />
    "name":"item 4", <br />
    "weight":500 <br />
  } <br />

- /api/loadMover <br />
  method: Post <br />
  desc: load mover with item <br />
  requset body: <br />
  { <br />
    "moverId": "66980b903a0bb9eb235a77ae", <br />
    "itemId":  "669988d94181aec44891335c" <br />
  } <br />

- /api/startMession/:moverId <br />
  method: get <br />
  desc: start mover mession <br />
  example: .../api/startMession/66980b903a0bb9eb235a77ae <br />

- /api/endMession/:moverId <br />
  method: get <br />
  desc: end mover mession <br />
  example: .../api/endMession/66980b903a0bb9eb235a77ae <br />

- /api/listMostComplete <br />
  method: get <br />
  desc: List who completed the most missions with a fetch endpoint (descending order). <br />
  
## Database:
### cloud database using:
  MongoDB Atlas
### connectionString:
  mongodb+srv://unifiuser:unifi2024@unifidb.0y81c1u.mongodb.net/unifisolutions?retryWrites=true&w=majority&appName=unifidb

## installed packeges:
- express
- winston: for activities logging
- mongoose
- dotenv
- express-validator

## soon:
  - Good comments using JSDoc
  - Live documentation using Swagger or similar technologies
  - e2e tests using Jest and supertest, or similar technologies
  - Docker
  - DI using tsyringe or similar tool
