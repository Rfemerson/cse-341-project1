const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'Origin, x-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('access-Control-Allow-Headers', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes/index'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and node is running on port ${port}`)});
    }
});
