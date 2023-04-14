import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const routes = [
  {
    text: "Upload",
    route: "/upload",
  },
  {
    text: "Browse",
    route: "/browse",
  },
];
const Navbar = () => (
  <Flex
    p="1rem 3rem"
    w="100%"
    borderRadius="0.125rem"
    boxShadow="xs"
    bg="green.400"
    alignContent="center"
  >
    <Text
      textAlign="left"
      color="white"
      as="bold"
      fontSize="2xl"
      lineHeight="10"
    >
      <Link to="/">Frontal</Link>
    </Text>
    <Flex ml="auto" alignContent="center">
      {routes.map(({ text, route }) => (
        <Text
          key={`${text}-${route}`}
          ml="1rem"
          fontSize="large"
          color="white"
          lineHeight="10"
        >
          <Link key={`${text}-${route}`} to={route}>
            {text}
          </Link>
        </Text>
      ))}
    </Flex>
  </Flex>
);

export default Navbar;
