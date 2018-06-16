const express = require('express');
const morgan = require('morgan');
const aws = require('aws-sdk');
const uuid4 = require('uuid/v4');

const bucket = 'chrisguitarguy-s3-uploads-tutorial';
const expires = 60 * 5;
const app = express();
const s3 = new aws.S3({
    // this is required for presigned URLs + CORs requests, apparently
    // https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-streaming.html
    signatureVersion: 'v4',
});

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('./'));

// you may want to do something like send the original filename to this endpoint
// to include in the generated file name or to figure out an extension.
app.post('/presign', function (req, res) {
    const filename = uuid4();
    s3.getSignedUrl('putObject', {
        Bucket: bucket,
        Key: filename,
        Expires: expires,
    }, function (err, url) {
        if (err) {
            return res.status(500).json({error});
        }

        res.status(201).json({
            url,
            filename,
        });
    });
});

app.post('/submit', function (req, res) {
    console.log(req.body);

    return res.status(200).json({
        filename: req.body.filename,
    });
});

const server = app.listen(8080, function () {
    console.log('server running', server.address());
});
