import React, {useState} from 'react';
import '../FileDrop/FileDrop.css';
import Form from '../Form/Form';

function FileDropArea() {
  const [isDragging, setIsDragging] = useState(false);
  const [locationUndetermined, setLocationUndetermined] = useState(false);
  const [Message, setMessage] = useState('Save your files based on location.');
  const [uploadStatus, setUploadStatus] = useState('');

  // Define event handlers for drag and drop interactions
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // We use fetch to send a POST request to the /upload endpoint (assuming your Flask endpoint is at that path).
  // The body of the request is set to the formData object.
  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    // Access the dropped files
    const droppedFiles = Array.from(e.dataTransfer.files);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', droppedFiles[0]); // Assuming you handle only one file

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File upload successful');
        setMessage('File upload successful');
        setUploadStatus('success');
      } else {
        console.error('File upload failed');
        setMessage(
          'File upload failed. Location could not be determined, please write city name below',
        );
        setLocationUndetermined(true);
        setUploadStatus('failure');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div
        data-testid="filedrop-todo-1" className={`message ${uploadStatus === 'success' ? 'success' : ''} ${
          uploadStatus === 'failure' ? 'failure' : ''
        }`}
      >
        {Message}
      </div>
      {/* Render Form only if location is undetermined */}
      {locationUndetermined && <Form />}
      <div
        data-testid="filedrop-todo-2"
        className={`file-drop-area ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p data-testid="filedrop-todo-3">Drag & Drop your files to upload</p>
      </div>
    </div>
  );
}

export default FileDropArea;
