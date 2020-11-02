import Viewer from './components/viewer/Viewer';
import Nav from './components/navigation/Nav';
import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [responseUrl, setResponseUrl] = useState('');

  const handleChange = e => {
    setUrl(e.target.value);
  };

  const handleSubmit = e => {
    fetch(`http://127.0.0.1:3001/website?url=${url}`).then(async (response) => {
      if (response.ok) {
        let json = await response.json();
        setResponseUrl(json.data);
        console.log(responseUrl);
      }
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <div className="App">
      <Nav handleSubmit={handleSubmit} handleChange={handleChange} />
      <Viewer url={responseUrl}/>
    </div>
  );
}

export default App;
