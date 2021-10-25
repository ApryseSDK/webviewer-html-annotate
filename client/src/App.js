import Viewer from './components/viewer/Viewer';
import Nav from './components/navigation/Nav';
import { useState } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState({});
  const [show, setShow] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);

  const PORT = 3005;
  const PATH = `0.0.0.0:${PORT}`;


  const loadURL = (url, width, height) => {
    // setShow(true);

    fetch(`http://${PATH}/website?url=${url}`)
      .then(async (response) => {
          setResponse({
            url: `http://${PATH}`,
            width: 1800,
            height: 6000,
            thumb: '',
            origUrl: `http://${PATH}`,
          });
          setShow(false);
      })
      .catch((err) => {
        setShow(false);
        setFetchError(
          'Trouble fetching the URL, please make sure the server is running. `cd server && npm start`'
        );
      });
  };

  const downloadPDF = () => {
    setShow(true);
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
    setShow(false);
  };

  return (
    <div className="App">
      <Nav
        handleSubmit={loadURL}
        fetchError={fetchError}
        showSpinner={show}
        handleDownload={downloadPDF}
      />
      <Viewer res={response} loadURL={loadURL} pdf={pdfBlob} />
    </div>
  );
}

export default App;
