import { useState } from 'react';
import './Nav.css';
import { SelectList, Heading, TextField, Button, Text } from 'gestalt';
import 'gestalt/dist/gestalt.css';

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

const Nav = ({ handleSubmit }) => {
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(2000);
  const [error, setError] = useState(false);
  const [protocol, setProtocol] = useState(protocolOptions[0].value);

  return (
    <div className="Nav">
      <Heading size="md">WebViewer HTML Annotate</Heading>
      <p>
        In this demo, you can pass any URL. The URL passed in will be scraped
        and saved server-side as a snapshot in time. Then you will be annotate
        that copy here.
      </p>
      <SelectList
        id="protocol"
        name="protocol"
        label="Protocol"
        onChange={({ value }) => setProtocol(value)}
        options={protocolOptions}
        value={protocol}
      />
      <TextField
        id="url"
        onChange={({ value }) => {
          setUrl(value);
        }}
        label="Domain"
        value={url}
        type="url"
      />
      <p>{`${protocol}://${url}`}</p>
      <TextField
        id="width"
        onChange={({ value }) => {
          setWidth(value);
        }}
        placeholder="1000"
        label="Width of the page"
        value={width}
        type="number"
      />
      <TextField
        id="height"
        onChange={({ value }) => {
          setHeight(value);
        }}
        placeholder="2000"
        label="Height of the page"
        value={height}
        type="number"
      />
      <Button
        text="Load the website"
        inline
        onClick={() => {
          if (url !== '' && width !== 0 && height !== 0) {
            handleSubmit(`${protocol}://${url}`, width, height);
          } else {
            setError(true);
          }
        }}
      />
      {error ? <Text color="red">Please enter a valid URL, width and height and try again.</Text> : null}
    </div>
  );
};

export default Nav;
