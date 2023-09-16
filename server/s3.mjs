import AWS from 'aws-sdk';
AWS.config.update({region:'us-east-2'});
import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { v4 as uuid } from "uuid";
 

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


const s3 = new S3Client({
    region: 'us-east-2'
});

const BUCKET = process.env.BUCKET;
const BUCKET_NAME = "universityphotos";

// console.log(`BUCKETTTTT: ${BUCKET}`);
import dotenv from 'dotenv';
dotenv.config();
console.log(`BUCKET: ${process.env.BUCKET}`);
console.log(`BUCKET REGION: ${process.env.AWS_DEFAULT_REGION}`);


export const uploadToS3 = async ({file, userId}) => {
    const key = `${userId}/${uuid()}`;
    const command = new PutObjectCommand({   
        Bucket: BUCKET_NAME, 
        Key: key, 
        Body: file.buffer, 
        ContentType: file.mimetype
    });
    

    try {
        await s3.send(command);
        return { key };
    } catch (err) {
        console.log(err);
        return { err };
    }
    
};

const getUserPresignedUrls = async (userId, key) => {
    try {
        const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key});
        getSignedUrl (s3, command, {expiresIn:900});
    } catch (err) {
        return 
    }
}