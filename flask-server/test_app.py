import unittest
import os
import json
from io import BytesIO

# Import Flask app
from server import app

from unittest.mock import patch
from location import (
    get_current_location,
)


class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        # Set up the test client
        app.config["TESTING"] = True
        self.app = app.test_client()
        self.app.testing = True

        # Setup for the test: Create a test directory and file in the uploads folder
        self.test_upload_folder = app.config["UPLOAD_FOLDER"]
        self.test_dir = os.path.join(self.test_upload_folder, "test_dir")
        if not os.path.exists(self.test_dir):
            os.makedirs(self.test_dir)

        self.test_file_path = os.path.join(self.test_dir, "test_file.txt")
        with open(self.test_file_path, "w") as test_file:
            test_file.write("Test content")

    def tearDown(self):
        # Clean up: Remove the test directory and its contents
        if os.path.exists(self.test_file_path):
            os.remove(self.test_file_path)
        if os.path.exists(self.test_dir):
            os.rmdir(self.test_dir)

    # Test for the upload route
    def test_upload_route(self):
        response = self.app.post(
            "/upload", data=dict(file=(BytesIO(b"my file contents"), "test.txt"))
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"OK", response.data)

    def test_get_uploaded_files(self):
        # Simulate a GET request to the /api/files endpoint
        response = self.app.get("/api/files")

        # Assert that the response status code is 200
        self.assertEqual(response.status_code, 200)

        # Assert that the response is JSON and has the correct structure
        data = json.loads(response.data)
        self.assertIsInstance(data, dict)
        self.assertIn("test_dir", data)
        self.assertIn("test_file.txt", data["test_dir"])


class TestLocationFunction(unittest.TestCase):
    @patch("location.requests.get")
    def test_get_current_location_success(self, mock_get):
        # Mock the response from requests.get
        mock_get.return_value.ok = True
        mock_get.return_value.json.return_value = {"city": "Test City"}

        location = get_current_location()
        self.assertEqual(location, "Test City")

    @patch("location.requests.get")
    def test_get_current_location_failure(self, mock_get):
        # Simulate a failure in requests.get
        mock_get.side_effect = Exception("Failed to connect")

        location = get_current_location()
        self.assertIsNone(location)


if __name__ == "__main__":
    unittest.main()
