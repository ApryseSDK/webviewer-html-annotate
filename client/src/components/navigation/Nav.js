import { useState } from 'react';
import {
  Heading,
  Select,
  Input,
  Button,
  Text,
  FormLabel,
  FormControl,
  Spinner,
} from '@chakra-ui/react';
import './Nav.css';

const protocolOptions = [
  {
    value: 'https',
    label: 'https',
  },
  {
    value: 'http',
    label: 'http',
  },
];

const Nav = ({ handleSubmit, fetchError, showSpinner }) => {
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(2000);
  const [error, setError] = useState(false);
  const [protocol, setProtocol] = useState(protocolOptions[0].value);

  return (
    <div className="Nav">
      <Heading size="md">WebViewer HTML</Heading>
      <Text py={5}>
        In this demo, you can pass any URL. The URL passed in will be scraped
        and saved server-side as a snapshot in time. Then you will be annotate
        that copy here.
      </Text>
      <FormControl id="protocol">
        <FormLabel>Protocol</FormLabel>
        <Select
          id="protocol"
          value={protocol}
          onChange={(e) => {
            setProtocol(e.target.value);
          }}
        >
          {protocolOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl id="domain">
        <FormLabel>Domain</FormLabel>
        <Input
          size="md"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          value={url}
          type="url"
        />
        <Text py={5}>{`${protocol}://${url}`}</Text>
      </FormControl>
      <FormControl id="width">
        <FormLabel>Width of the page</FormLabel>
        <Input
          size="md"
          onChange={(e) => {
            setWidth(e.target.value);
          }}
          value={width}
        />
      </FormControl>
      <FormControl id="height">
        <FormLabel>Height of the page</FormLabel>
        <Input
          size="md"
          onChange={(e) => {
            setHeight(e.target.value);
          }}
          placeholder="2000"
          value={height}
        />
        <Button
          my={3}
          onClick={() => {
            if (url !== '' && width !== 0 && height !== 0) {
              handleSubmit(`${protocol}://${url}`, width, height);
            } else {
              setError(true);
            }
          }}
        >
          {showSpinner && <Spinner mx={1} label="Loading website" />}Load the website
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
