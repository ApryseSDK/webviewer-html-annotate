import { useState } from 'react';
import {
  Heading,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  Text,
  FormLabel,
  FormControl,
  Spinner,
} from '@chakra-ui/react';
import './Nav.css';

const Nav = ({ handleSubmit, fetchError, showSpinner, handleDownload }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);

  return (
    <div className="Nav">
      <Heading size="md">WebViewer HTML</Heading>
      <Text py={5}>
        In this demo, you can pass any URL. The URL passed in will be scraped
        and saved server-side as a snapshot in time. Then you will be annotate
        that copy here.
      </Text>
      <FormControl id="domain">
        <FormLabel>URL of the page</FormLabel>
        <InputGroup
          onChange={(e) => {
            setUrl(`https://${e.target.value}`);
          }}
        >
          <InputLeftAddon children="https://" />
          <Input placeholder="mysite" />
        </InputGroup>
      </FormControl>
      <FormControl id="submit">
        <Button
          my={3}
          onClick={() => {
            if (!!url) {
              handleSubmit(url);
            } else {
              setError(true);
            }
          }}
        >
          {showSpinner && <Spinner mx={1} label="Loading website" />}Load the
          website
        </Button>
      </FormControl>
      <FormControl id="downloadPDF">
        <Button my={3} onClick={() => handleDownload()}>
          {showSpinner && <Spinner mx={1} label="Loading website" />}Download
          annotated PDF
        </Button>
      </FormControl>

      {error && (
        <Text color="red">
          Please enter a valid URL, width and height and try again.
        </Text>
      )}
      {fetchError ? <Text color="red">{fetchError}</Text> : null}
    </div>
  );
};

export default Nav;
