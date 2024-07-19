# UnifiSolutions Task
Welcome to Magic Transporters, the future of moving things easily. These super cool
transporters, powered by virtual magic, are here to make shipping stuff a breeze.

## API deployed URL:
[--> visit](https://unifisolutions.onrender.com/)


## API ROUTES:
- /api/movers
  method: get
  desc: get all movers documents

- /api/items
  method: get
  desc: get all items documents

- /api/addMover
  method: Post
  desc: add new Mover
  requset body:
  {
    "weightlimit": 1900
  }

- /api/addItem
  method: Post
  desc: add new Item
  requset body:
  {
    "name":"item 4",
    "weight":500
  }

- /api/loadMover
  method: Post
  desc: load mover with item
  requset body:
  {
    "moverId": "66980b903a0bb9eb235a77ae",
    "itemId":  "669988d94181aec44891335c"
  }

- /api/startMession/:moverId
  method: get
  desc: start mover mession
  example: .../api/startMession/66980b903a0bb9eb235a77ae

- /api/endMession/:moverId
  method: get
  desc: end mover mession
  example: .../api/endMession/66980b903a0bb9eb235a77ae

- /api/listMostComplete
  method: get
  desc: List who completed the most missions with a fetch endpoint (descending order).
  
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
