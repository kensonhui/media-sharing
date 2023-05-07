import { ChangeEvent, useState } from "react";
import {
  Button,
  Container,
  Center,
  Flex,
  Grid,
  Input,
  Text,
} from "@chakra-ui/react";
import { bytesToMegaBytes } from "../services/byteConversion";
import axios from "axios";
import FilePreview from "./FilePreview";
const Dashboard = () => {
  const [file, setFile] = useState<File>();
  const [numPages, setNumPages] = useState<number>(0);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleUploadClick = () => {
    if (!file) {
      console.log("No file");
      return;
    }
    const formData = new FormData();
    formData.append("name", "hello");
    formData.append("file", file);

    axios
      .post("http://localhost:5000/api/files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => console.log(response));
  };

  return (
    <Flex direction="column">
      {file && <FilePreview file={file} />}
      <Center boxShadow="xs" p="3rem">
        <label htmlFor="file-upload">
          {file ? "Upload another file" : "Upload a file"}
        </label>
        <Input
          id="file-upload"
          display="none"
          type="file"
          onChange={handleFileChange}
        />
      </Center>
      {file && (
        <Center>
          <Text>File Size: {bytesToMegaBytes(file.size)}</Text>
          <Button onClick={handleUploadClick}>Upload</Button>
        </Center>
      )}
    </Flex>
  );
};
export default Dashboard;
