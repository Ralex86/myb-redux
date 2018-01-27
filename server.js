const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const fetch = require('node-fetch')


const app = express()
var bodyParser = require("body-parser"); // Body parser for fetch posted data
const PORT = 3000

const server = http.createServer(app)
const io = socketIO(server)


app.get('/*',function(request,response,next){
  response.header('Access-Control-Allow-Origin' , 'https://preprod.moveyourbuddy.io/');
      response.header('Access-Control-Allow-Credentials', true);
      next();
});

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); // Body parser use JSON data

server.listen(PORT, () => {
    console.log(`express server is up on port: ${PORT}`)
})
