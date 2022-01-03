import { Box } from "@chakra-ui/react";

import TextSection from "components/TextSection";
import CTASection from "components/CTASection";
import ImageSection from "components/ImageSection";

import Form from 'components/Form'

const Home = () => {
  return (
    <Box mb={8} w="full">
      <TextSection />
      <ImageSection />
      <Form />
    </Box>
  );
};

export default Home;
