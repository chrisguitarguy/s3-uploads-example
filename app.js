const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('./'));

const server = app.listen(8080, function () {
    console.log('server running', server.address());
});
