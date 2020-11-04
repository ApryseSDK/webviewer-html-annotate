import Viewer from './components/viewer/Viewer';
import Nav from './components/navigation/Nav';
import { useState } from 'react';
import { Spinner, Layer, Box } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import './App.css';

function App() {
  const [response, setResponse] = useState([]);
  const [show, setShow] = useState(false);

  const handleSubmit = (url, width, height) => {
    setShow(true);
    fetch(`http://127.0.0.1:3001/website?url=${url}`)
      .then(async response => {
        if (response.ok) {
          let json = await response.json();
          setResponse([json.data, width, height]);
          setShow(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Layer>
        <Box
          fit
          dangerouslySetInlineStyle={{
            __style: {
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          paddingX={1}
          position="fixed"
        >
          <Spinner show={show} accessibilityLabel="Loading website" />
        </Box>
      </Layer>

      <div className="App">
        <Nav handleSubmit={handleSubmit} />
        <Viewer res={response} />
      </div>
    </div>
  );
}

export default App;
