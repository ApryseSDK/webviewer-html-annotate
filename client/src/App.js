import Viewer from './components/viewer/Viewer';
import Nav from './components/navigation/Nav';
import { useState } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);

  const PORT = 3100;
  const PATH = `0.0.0.0:${PORT}`;


  const loadURL = (url) => {
    setLoading(true);
    setFetchError('');
    fetch(`http://${PATH}/website-proxy-pdftron?url=${url}`)
      .then(async (response) => {
        var size = { width: 1800, height: 7000 };
        try {
          size = JSON.parse(response.statusText);
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
    setLoading(true);
    if (response.url) {
      const urlArray = response.url.split('/');
      fetch(
        `http://127.0.0.1:3001/getpdf?url=${urlArray[4]}&width=${response.width}&height=${response.height}`
      ).then((res) => {
        return res.blob('application/pdf');
      }).then((blob) => {
        console.log(blob);
        setPdfBlob(blob);
      });
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <Nav
        handleSubmit={loadURL}
        fetchError={fetchError}
        showSpinner={loading}
        handleDownload={downloadPDF}
      />
      <Viewer res={response} loadURL={loadURL} pdf={pdfBlob} />
    </div>
  );
}

export default App;
