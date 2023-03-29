import express, { Request, Response } from 'express';
import cors from "cors";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from './services/s3client';
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const EXPOSED_PORT = 5000;
const corsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    data: "hello"
  });
});

app.get("/push", async (req: Request, res: Response) => {
  const params = {
    Bucket: process.env.AWS_FILE_BUCKET_NAME,
    Key: "pop",
    Body: "di"
  }
  try {
    const results = await s3Client.send(new PutObjectCommand(params))
    res.sendStatus(200);
  } catch (err) {
    res.send({ data: `Error ${err}`});
  }
})

app.post("/api/files", (req, res: Response) => {
  console.log(req.body);
  s3Client.send(new PutObjectCommand({
    Bucket: "files",
    Key: req.body.name,
    Body: req.body
  }));
  res.send({ data: req.body});
})

app.listen(EXPOSED_PORT, () => {
  console.log(`Serve running on port ${EXPOSED_PORT}`);
});