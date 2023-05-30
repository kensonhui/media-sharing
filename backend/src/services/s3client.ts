import { S3, S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
const REGION = "us-east-1";
const s3Client = new S3Client({ 
    credentials: fromIni({ profile: 'video-stream'}),
    region: REGION
})

const s3 = new S3({
    credentials: fromIni({ profile: 'video-stream'}),
    region: REGION
})
export {s3, s3Client};