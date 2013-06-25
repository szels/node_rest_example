node_rest_example
=================

Example REST API, using node.js, express and mongoose

## Installation

1. clone project ;)
2. `npm install`
3. `node app.js`
4. browse to http://localhost:3000/users


## Testing the API using cURL

* get all users  
 `curl -i -X GET http://localhost:3000/users`

* get specific user with _id 12345678 (use an id that exists in your database)  
 `curl -i -X GET http://localhost:3000/users/12345678`

* add an user  
`curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "test", "email": "test@example.com", "password": "secret"}' http://localhost:3000/users`

* update user with _id 12345678  
`curl -i -X PUT -H 'Content-Type: application/json' -d '{"password": "top secret"}' http://localhost:3000/users/12345678`

* delete user with _id 12345678  
 `curl -i -X DELETE http://localhost:3000/users/12345678`


## Testing the API using mocha

`npm test`