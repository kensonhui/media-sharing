import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Container, Icon, Text } from "@chakra-ui/react";
const Landing = () => (
  <Box>
    <Container
      p="3rem"
      m="3rem auto"
      bg="green.100"
      boxShadow="xs"
      borderRadius="0.25rem"
    >
      <Text fontSize="3xl" align="center" color="black">
        Share, annotate, discuss academic resources for your courses
      </Text>

      <Center m="1rem">
        <Button bg="white">
          <Text mr="0.5rem">Get Started</Text>
          <ArrowForwardIcon />
        </Button>
      </Center>
    </Container>
  </Box>
);

export default Landing;
