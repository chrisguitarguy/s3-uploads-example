const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(express.static('./'));

app.listen(8080);
