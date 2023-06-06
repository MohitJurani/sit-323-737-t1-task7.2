const express = require("express");
const winston = require('winston');
const app = express();
const client = require('./dbConnection');
let collection = client.db('calculator').collection('history');

function insertData(data, callback) {
    collection.insertOne(data, callback);
}

// function getAllBeachs(callback){
//     collection.find().toArray(callback);
// }

// function removeBeaches(beach, callback) {
//     collection.deleteOne(beach, callback);
// }

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// function to log 
const logOperation = function (operation, num1, num2) {
    logger.log({
        level: 'info',
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`
    })
}

// function to save in mongoDB
const saveToDB =  function (operation, num1, num2, result) {
   insertData({
        operation:operation,
        num1:num1,
        num2:num2,
        result:result
    },(err,result )=>{
        console.log('Result:', result, err)
    })
}

// funciton to add num1 num2
const addition = (num1, num2) => {
    var ans = num1 + num2
    saveToDB('+', num1, num2, ans);
    return ans;
}

// funciton to substract num1 num2
const subtraction = (num1, num2) => {
    var ans = num1 - num2;
    saveToDB('-', num1, num2, ans);

    return ans;
}

// funciton to multiply num1 num2
const multiplication = (num1, num2) => {
    var ans = num1 * num2;
    saveToDB('x', num1, num2, ans);

    return ans;
}

// funciton to divide num1 num2\
const division = (num1, num2) => {
    var ans = num1 / num2;
    saveToDB('/', num1, num2, ans);
    return ans;
}

// funciton to percentage num1 num2
const percentage = (num1, num2) => {
    var ans = ( num2 / 100 ) * num1;
    saveToDB('%', num1, num2, ans);
    return ans;
}

// funciton to power num1 num2
const power = (num1, num2) => {
    var ans = Math.pow(num1, num2);;
    saveToDB('n', num1, num2, ans);
    return ans;
}

app.post('/add', function (req, res) {
    try {
        if (isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '')
            throw new Error("Number 1 incorrectly defined");
        if (isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '')
            throw new Error("Number 2 incorrectly defined");
        let num1 = parseFloat(req.body.num1);
        let num2 = parseFloat(req.body.num2);
        logOperation('addition', num1, num2);
        res.send(`<div><h1>The sum of the two numbers is ${addition(num1, num2)}</h1><a href='/'>Home</a></div>`);
    } catch (err) {
        logger.error(err.toString());
        res.status(500).send(`<h3>${err.toString()}</h3> <a href='/'>Home</a>`);
    }
})

app.post('/subtract', function (req, res) {
    try {
        if (isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '')
            throw new Error("Number 1 incorrectly defined");
        if (isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '')
            throw new Error("Number 2 incorrectly defined");
        let num1 = parseFloat(req.body.num1);
        let num2 = parseFloat(req.body.num2);
        logOperation('subtraction', num1, num2);
        res.send(`<div><h1>The subtraction of the two numbers is ${subtraction(num1, num2)}</h1><a href='/'>Home</a></div>`);
    } catch (err) {
        logger.error(err.toString());
        res.status(500).send(`<h3>${err.toString()}</h3> <a href='/'>Home</a>`);
    }
})

app.post('/multiply', function (req, res) {
    try {
        if (isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '')
            throw new Error("Number 1 incorrectly defined");
        if (isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '')
            throw new Error("Number 2 incorrectly defined");
        let num1 = parseFloat(req.body.num1);
        let num2 = parseFloat(req.body.num2);
        logOperation('multiplication', num1, num2);
        res.send(`<div><h1>The multiplication of the two numbers is ${multiplication(num1, num2)}</h1><a href='/'>Home</a></div>`);
    } catch (err) {
        logger.error(err.toString());
        res.status(500).send(`<h3>${err.toString()}</h3> <a href='/'>Home</a>`);
    }
})

app.post('/divide', function (req, res) {
    try {
        if (isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '')
            throw new Error("Number 1 incorrectly defined");
        if (isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '')
            throw new Error("Number 2 incorrectly defined");
        let num1 = parseFloat(req.body.num1);
        let num2 = parseFloat(req.body.num2);
        logOperation('division', num1, num2);
        res.send(`<div><h1>The division of the two numbers is ${division(num1, num2)}</h1><a href='/'>Home</a></div>`);
    } catch (err) {
        logger.error(err.toString());
        res.status(500).send(`<h3>${err.toString()}</h3> <a href='/'>Home</a>`);
    }
})

app.post('/percentage', function (req, res) {
    try {
        if (isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '')
            throw new Error("Number 1 incorrectly defined");
        if (isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '')
            throw new Error("Number 2 incorrectly defined");
        let num1 = parseFloat(req.body.num1);
        let num2 = parseFloat(req.body.num2);
        logOperation('percentage', num1, num2);
        res.send(`<div><h1>The ${num1}% of the ${num2} is ${percentage(num1, num2)}</h1><a href='/'>Home</a></div>`);
    } catch (err) {
        logger.error(err.toString());
        res.status(500).send(`<h3>${err.toString()}</h3> <a href='/'>Home</a>`);
    }
})

app.post('/power', function (req, res) {
    try {
        if (isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '')
            throw new Error("Number 1 incorrectly defined");
        if (isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '')
            throw new Error("Number 2 incorrectly defined");
        let num1 = parseFloat(req.body.num1);
        let num2 = parseFloat(req.body.num2);
        logOperation('division', num1, num2);
        res.send(`<div><h1>The power of numbers ${power(num1, num2)}</h1><a href='/'>Home</a></div>`);
    } catch (err) {
        logger.error(err.toString());
        res.status(500).send(`<h3>${err.toString()}</h3> <a href='/'>Home</a>`);
    }
})


app.get('/history',async function (req, res) {
    try {
        const findResult = await collection.find({}).toArray();
        res.json({statusCode: 200, data: findResult, message: 'Successful'});
    } catch (err) {
        logger.error(err.toString());
        res.status(500).send(`<h3>${err.toString()}</h3> <a href='/'>Home</a>`);
    }
})

app.get('/reset', async function (req, res) {
    try {
        await collection.deleteMany();
        res.redirect('/')
    } catch (err) {
        logger.error(err.toString());
        res.status(500).send(`<h3>${err.toString()}</h3> <a href='/'>Home</a>`);
    }
})

var port = process.env.port || 3000;
app.listen(port, () => console.log(">> App listening at localhost:" + port));