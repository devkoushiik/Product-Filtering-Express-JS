require('dotenv').config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const errorHandlerMiddleWare = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const productRouter = require("./routes/products");

// middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//product route
app.use("/api/v1", productRouter);
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