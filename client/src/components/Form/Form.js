import React, {useState} from 'react';
import './Form.css';

const Form = () => {
  const [cityName, setCityName] = useState('');
  const [file, setFile] = useState(null);
  const [Message, setMessage] = useState('');

  const handleCityChange = (e) => {
    setCityName(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Capture the first file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('cityName', cityName);

    try {
      const response = await fetch('/submit_city', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File and city name submitted successfully');
        setMessage('File and city name submitted successfully');
        // Handle successful submission
      } else {
        console.error('Submission failed');
        setMessage('Submission failed');
        // Handle failure
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
  return (
    <form className="submission-form" onSubmit={handleSubmit}>
      <div className="city-dialog">
        <p className="form-text" data-testid="form-todo-1">
          Please provide a city name and upload a file below:
        </p>
        <input
          type="text"
          value={cityName}
          onChange={handleCityChange}
          className="form-input"
          required
        />
        <p className="form-text" data-testid="form-todo-2">Select a file to upload:</p>
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          required
        />
        <button type="submit" className="form-button" data-testid="form-todo-3">
          Submit
        </button>
      </div>
      <div></div>
      <div data-testid="form-todo-4">{Message}</div>
    </form>
  );
};

export default Form;
