import { ChangeEvent, useState } from "react";
import {
  Button,
  Container,
  Center,
  Flex,
  Grid,
  Input,
  Text,
  Textarea,
  FormLabel,
} from "@chakra-ui/react";
import { bytesToMegaBytes } from "../services/byteConversion";
import axios from "axios";
import FilePreview from "./FilePreview";
const Dashboard = () => {
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    formData.append("title", title);
    formData.append("description", description);

    axios
      .post("http://localhost:5000/api/files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => console.log(response));
  };

  return (
    <Flex direction="column">
      {file && <FilePreview file={file} />}
      {!file && (
        <Button>
          <label htmlFor="file-upload">Upload a file</label>
        </Button>
      )}
      <Input
        id="file-upload"
        display="none"
        type="file"
        onChange={handleFileChange}
      />
      {file && (
        <Flex direction="column">
          <FormLabel> Title</FormLabel>
          <Input onChange={({ target: { value } }) => setTitle(value)} />
          <FormLabel> Description </FormLabel>
          <Textarea
            placeholder="A small description of the file:"
            onChange={({ target: { value } }) => setDescription(value)}
          />
          <Text>File Size: {bytesToMegaBytes(file.size)} MB</Text>
          <Button onClick={handleUploadClick}>Upload</Button>
          <Button>
            <label htmlFor="file-upload">Choose another FIle</label>
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
export default Dashboard;
