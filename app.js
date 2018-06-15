const express = require('express');
const morgan = require('morgan');
const aws = require('aws-sdk');
const uuid4 = require('uuid/v4');

const bucket = 'chrisguitarguy-s3-uploads-tutorial';
const expires = 60 * 5;
const app = express();
const s3 = new aws.S3();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('./'));

// you may want to do something like send the original filename to this endpoint
// to include in the generated file name or to figure out an extension.
app.post('/presign', function (req, res) {
    s3.getSignedUrl('putObject', {
        Bucket: bucket,
        Key: uuid4(),
        Expires: expires,
    }, function (err, url) {
        if (err) {
            return res.status(500).json({error});
        }

        res.status(201).json({url});
    });
});


const server = app.listen(8080, function () {
    console.log('server running', server.address());
});
