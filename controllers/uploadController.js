const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.SECRET_KEY,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,
});

const BUCKET = process.env.BUCKET;
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        }
    })
});

module.exports = {
    uploadFile: async (req, res, next) => {
        try {
            upload.single('file')(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).send({ error: 'File upload error' });
                } else if (err) {
                    console.log(err)
                    return res.status(500).send({ error: 'Server error' });
                }
                res.send('Successfully uploaded ' + req.file.location + ' location!');
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Server error' });
        }
    },
    listFiles: async (req, res) => {
        try {
            let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
            let x = r.Contents.map(item => item.Key);
            res.send(x);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Server error' });
        }
    },
    downloadFile: async (req, res) => {
        try {
            const filename = req.params.filename;
            let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
            res.send(x.Body);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Server error' });
        }
    },
    deleteFile: async (req, res) => {
        try {
            const filename = req.params.filename;
            await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
            res.send("File Deleted Successfully");
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Server error' });
        }
    }
};
