import React, {useState, useEffect} from 'react';
import './List.css';

function List() {
  const [folderFiles, setFolderFiles] = useState({});

  useEffect(() => {
    // Fetch the list of uploaded files from the Flask API
    fetch('/api/files')
      .then((response) => response.json())
      .then((data) => setFolderFiles(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="list-section">
      <h2 className="list-title">Uploaded Files:</h2>
      {Object.entries(folderFiles).map(([folderName, files], index) => (
        <div key={index}>
          <table className="file-table">
            <thead>
              <tr>
                <th className="city-item">{folderName}</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, fileIndex) => (
                <tr key={fileIndex}>
                  <td className="file-item">{file}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default List;
