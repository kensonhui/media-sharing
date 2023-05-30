import { useEffect, useState } from "react";
import { Center, Container, Grid, Text } from "@chakra-ui/react";
import axios from "axios";

interface Post {
  _uid: string;
  user: string;
  title: string;
  description: string;
  file: {
    name: string;
    key: string;
    url: string;
  };
}

const Browse = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const fetchPosts = async () => {
    await axios
      .get("http://localhost:5000/api/posts")
      .then((response) => setPosts(response.data));
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Center flexDirection="column">
      <Text fontSize="2xl"> Collection of Uploads</Text>
      <Grid>
        {posts.map((post) => {
          const { _uid, file, title, description } = post;
          return (
            <Container key={_uid}>
              <Text fontSize="md"> {title} </Text>
              <Text fontSize="sm"> {description}</Text>
            </Container>
          );
        })}
      </Grid>
    </Center>
  );
};

export default Browse;
