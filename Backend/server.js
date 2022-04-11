const express = require('express');
const bodyParser = require('body-parser')

const app = express();
cors = require("cors");
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const users = require('./models/users')
app.use('/users',users)
const posts = require('./models/posts')
app.use('/posts',posts)
const cart = require('./models/cart')
app.use('/cart',cart)
const history = require('./models/history')
app.use('/history',history)
const reviews = require('./models/reviews')
app.use('/reviews',reviews)
app.get('/',async (req,res) => {
    res.status(200).json("ola")
});
app.listen(8080);