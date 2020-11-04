import { useState } from 'react';
import './Nav.css';
import { Heading, TextField, Button, Text } from 'gestalt';
import 'gestalt/dist/gestalt.css';

const Nav = ({ handleSubmit }) => {
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(2000);
  const [error, setError] = useState(false);

  return (
    <div className="Nav">
      <Heading size="md">WebViewer HTML Annotate</Heading>
      <p>
        In this demo, you can pass any URL. The URL passed in will be scraped
        and saved server-side as a snapshot in time. Then you will be annotate
        that copy here.
      </p>
      <TextField
        id="url"
        onChange={({ value }) => {
          setUrl(value);
        }}
        placeholder="https://"
        label="URL to load"
        value={url}
        type="url"
      />
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
            handleSubmit(url, width, height);
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
