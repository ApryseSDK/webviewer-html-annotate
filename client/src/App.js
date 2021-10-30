import Viewer from './components/viewer/Viewer';
import Nav from './components/navigation/Nav';
import { useState } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [buffer, setBuffer] = useState(null);

  const PORT = 3100;
  const PATH = `0.0.0.0:${PORT}`;


  const loadURL = (url) => {
    setLoading(true);
    setFetchError('');
    fetch(`http://${PATH}/website-proxy-pdftron?url=${url}`)
      .then(async (res) => {
        var size = { width: 1800, height: 7000 };
        try {
          size = JSON.parse(res.statusText);
        } catch (e) {
        }
        setResponse({
          url: `http://${PATH}`,
          thumb: '',
          ...size,
          origUrl: `http://${PATH}`,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setFetchError(
          'Trouble fetching the URL, please make sure the server is running. `cd server && npm start`'
        );
      });
  };

  const downloadPDF = () => {
    if (response.url) {
      setLoading(true);
      fetch(`http://${PATH}/pdftron-pdf`)
        .then(async (res) => {
          console.log(res);
          setBuffer(res);
          setLoading(false);
        }).catch(err => console.log(err));
    }
  };

  // receive new loading state from Viewer as loadDocAndAnnots takes a while
  const loadingFromViewer = (value) => setLoading(value);

  return (
    <div className="App">
      <Nav
        handleSubmit={loadURL}
        fetchError={fetchError}
        showSpinner={loading}
        handleDownload={downloadPDF}
      />
      <Viewer res={response} loadURL={loadURL} buffer={buffer} loading={loadingFromViewer} />
    </div>
  );
}

export default App;
