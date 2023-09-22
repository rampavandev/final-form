const path = require('path');
const  { Pool, Client } = require('pg');

const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'development.env')
});

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});
const port = 3002;
const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile('public/app.html', {root: __dirname});
});

app.post('/saveform',(req, res) => {
    const msg = saveTodb(req.body);
    res.statusCode = 201;
    msg.then(message => {
        res.send(message);
    });
} )

app.listen(port, () => {
    console.log(`form app listening on port: ${port}`);
})

async function saveTodb(obj){
    let message = "form saved successfully";
    try {
        const query = {
            text: 'INSERT INTO users(username, email, feedback) VALUES($1, $2, $3)',
            values: [obj.username, obj.email, obj.feedback],
        }
        await pool.query(query);
    } catch (error) {
        message = "form failed to save";
        console.error(error);
    }
    return message;
}




