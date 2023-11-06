from flask import Flask, request
import os
from werkzeug.utils import secure_filename
from flask import jsonify

# location functionality is in another file
from location import get_current_location


app = Flask(__name__)

# FILES are saved inside uploads folder in flask-server app
# we need to add a folder creation functionality at the moment of uploading file,
# then the functionality of naming the folder as the city
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# Define a route in your Flask app that listens for a POST request with a file attached.
# This route will handle the file upload and return a response.
# In this endpoint, it checks if the file was included in the request, logs the file name, and then returns "OK."
@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return "No file part"

    file = request.files["file"]

    if file.filename == "":
        return "No selected file"

    if file:
        # Secure the filename to prevent malicious file names
        filename = secure_filename(file.filename)
        # Save the file to the "uploads" folder
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        # Log the file name
        print(f"Received file: {file.filename}")

        # Process the file
        # Return a response
        return "OK"

    return "File upload failed"


# this endpoint, we use it in the front end to display the files in the uploads folder
@app.route("/api/files", methods=["GET"])
def get_uploaded_files():
    # List files in the uploads folder
    uploaded_files = os.listdir(app.config["UPLOAD_FOLDER"])
    # Return the list of files as JSON
    return jsonify(uploaded_files)


if __name__ == "__main__":
    app.run(debug=True)
    # this prints the current location
    current_location = get_current_location()
    if current_location:
        print(f"Current Location: {current_location}")
    else:
        print("Location could not be determined.")
