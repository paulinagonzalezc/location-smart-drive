import React, {useState, useEffect} from 'react';

function List() {
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    // Fetch the list of uploaded files from the Flask API
    fetch('/api/files')
      .then((response) => response.json())
      .then((data) => setFileNames(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Uploaded Files:</h2>
      <ul>
        {fileNames.map((filename, index) => (
          <li key={index}>{filename}</li>
        ))}
      </ul>
    </div>
  );
}

export default List;
