import Viewer from './components/viewer/Viewer';
import Nav from './components/navigation/Nav';
import { useState } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState({});
  const [show, setShow] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);

  const loadURL = (url, width, height) => {
    setShow(true);
    fetch(
      `http://127.0.0.1:3001/website?url=${url}&width=${width}&height=${height}`
    )
      .then(async (response) => {
        if (response.ok) {
          const json = await response.json();
          if (json.data.url) {
            json.data.url = `http://localhost:3000/redirect/${json.data.url}`;
          }
          setResponse({
            url: json.data.url,
            width,
            height,
            thumb: json.data.thumb,
            origUrl: url
          });
          setShow(false);
        }
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
