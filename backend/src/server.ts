import express, { Request, Response, urlencoded } from 'express';
import cors from "cors";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3, s3Client } from './services/s3client';
import mongodbClient from './services/atlasClient';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
const s3PublicUrl = require('node-s3-public-url');
import fs from "fs";
import path from 'path';

dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/'});

const EXPOSED_PORT = 5000;
const corsOptions = {
  origin: ["http://localhost", "http://localhost:3000"]
}

const databaseName = process.env.ATLAS_DATABASE;
const pdfCollection = process.env.ATLAS_PDF_COLLECTION;
const databaseInstance = mongodbClient.db(databaseName);
const collectionInstance = databaseInstance.collection(pdfCollection);

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req: Request, res: Response) => {
  res.send({
    data: "hello"
  });
});

/**
 * TODO: Frontend upload directly to S3 via presigned url
 */
app.get("/api/uploadUrl", async(req, res) => {
  const signedUrlExpireSeconds = 60;
})

app.get("/api/posts", async(req, res) => {
  const results = await collectionInstance.find({}).toArray();
  res.send(results);
})

app.post("/api/files", upload.single("file"), async (req, res: Response, next) => {
  if (!req.file) {
    return next(new Error("File upload failed"));
  }
  const { title, description } = req.body;
  const { filename, destination, originalname  } = req.file;
  const fileContent = fs.readFileSync(path.join(destination, filename));

  const key = originalname; // Set S3 bucket to original filename for now

  // Add PDF to S3
  s3Client.send(new PutObjectCommand({
    ACL: "public-read",
    Bucket: process.env.AWS_FILE_BUCKET_NAME,
    Key: key,
    Body: fileContent,
  }));

  // Add file upload data to Atlas
  let newPost = {
  user: "Anonymous",
    title: title,
    description: description,
    file: {
      name: originalname,
      key: key,
      url: `https://${process.env.AWS_FILE_BUCKET_NAME}.s3.amazonaws.com/${s3PublicUrl(key)}`
    }
  }
  try {
    const response = await collectionInstance.updateOne(
      {
        file: {
          key: key
        }
      },
      {
        $set: newPost
      },
      { upsert: true}


    );
  } catch (err) {
    console.error(err);
  }


  res.send( newPost );
})

app.listen(EXPOSED_PORT, () => {
  console.log(`Server running on port ${EXPOSED_PORT}`);
});