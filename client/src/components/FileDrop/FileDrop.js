import React, {useState} from 'react';
import '../FileDrop/FileDrop.css';

function FileDropArea() {
  const [isDragging, setIsDragging] = useState(false);
  const [Message, setMessage] = useState('waiting for file');

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
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);

  //   // Access the dropped files
  //   const droppedFiles = Array.from(e.dataTransfer.files);
  //   // Handle the dropped files here
  //   console.log('Dropped files:', droppedFiles);
  // };

  return (
    <div>
      <div>{Message}</div>
      <div
        className={`file-drop-area ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>Drag & Drop your files to upload</p>
      </div>
    </div>
  );
}

export default FileDropArea;
