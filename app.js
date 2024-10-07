require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./db/connect')

const errorHandlerMiddleWare = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');



// middlewares
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())



app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1><a href="/products">Products</a>')
})
app.get('/products', (req,res)=>{
    res.status(200).json({msg: 'no product'})
})

//product route

// custom middlewares
app.use(errorHandlerMiddleWare);
app.use(notFound);


const port = process.env.PORT || 3000;
const start = async () => {
    try {
        // db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()