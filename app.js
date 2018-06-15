const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');

const app = express();

app.use(morgan('tiny'));
app.use(parser.json());
app.use(express.static('./'));

const server = app.listen(8080, function () {
    const addy = server.address();
    console.log(`listening on http://${addy.host || '0.0.0.0'}:${addy.port}`);
});
