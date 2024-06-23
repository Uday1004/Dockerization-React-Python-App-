import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

function App() {
  const [message, setMessage] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios.get(`${API_BASE_URL}/api/data`)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePost = () => {
    axios.post(`${API_BASE_URL}/api/data`, {data:'Welcome to Dockerization of Reactapp with python backend'})
      .then(response => {
        setPostResponse(response.data.message);
      })
      .catch(error => {
        console.error("There was an error posting the data!", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>{message}</h1>
            <button onClick={handlePost}>Send Post Request</button>
            <p>{postResponse}</p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
