import React, {useState} from 'react';
import '../FileDrop/FileDrop.css';

function FileDropArea() {
  const [isDragging, setIsDragging] = useState(false);

  // Define event handlers for drag and drop interactions
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    // Access the dropped files
    const droppedFiles = Array.from(e.dataTransfer.files);
    // Handle the dropped files here
    console.log('Dropped files:', droppedFiles);
  };

  return (
    <div
      className={`file-drop-area ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drop Your File Here</p>
    </div>
  );
}

export default FileDropArea;
