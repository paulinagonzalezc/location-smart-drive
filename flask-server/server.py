from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename


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

    # Use the get_current_location function to retrieve the location
    location_name = get_current_location()

    if location_name is "None":
        return "File upload failed."

    else:
        # Sanitize the location name to create a valid folder name
        sanitized_location_name = location_name.replace(" ", "_")

        # Create a folder with the sanitized location name inside the "uploads" folder
        location_folder = os.path.join(
            app.config["UPLOAD_FOLDER"], sanitized_location_name
        )
        os.makedirs(location_folder, exist_ok=True)

        # Secure the filename to prevent malicious file names
        filename = secure_filename(file.filename)
        # Save the file to the "uploads" folder
        file.save(os.path.join(location_folder, filename))
        # Log the file name
        print(f"Received file: {file.filename}")

        # Process the file
        # Return a response
        return "OK"


@app.route("/submit_city", methods=["POST"])
def submit_city():
    if "file" not in request.files:
        return "No file part"

    file = request.files["file"]

    if file.filename == "":
        return "No selected file"

    city_name = request.form.get("cityName")

    if not city_name:
        return "City name is required"

    # Use the get_current_location function to retrieve the location
    location_name = city_name

    # Sanitize the location name to create a valid folder name
    sanitized_location_name = location_name.replace(" ", "_")

    # Create a folder with the sanitized location name inside the "uploads" folder
    location_folder = os.path.join(app.config["UPLOAD_FOLDER"], sanitized_location_name)
    os.makedirs(location_folder, exist_ok=True)

    # Secure the filename to prevent malicious file names
    filename = secure_filename(file.filename)
    # Save the file to the "uploads" folder
    file.save(os.path.join(location_folder, filename))
    # Log the file name
    print(f"Received file: {file.filename}")

    # Process the file
    # Return a response
    return "OK"


# this endpoint, we use it in the front end to display the files in the uploads folder
@app.route("/api/files", methods=["GET"])
def get_uploaded_files():
    # List files in the uploads folder
    # uploaded_files = os.listdir(app.config["UPLOAD_FOLDER"])
    # Return the list of files as JSON
    base_folder = app.config["UPLOAD_FOLDER"]
    all_files = {}
    # Iterate over all directories in the uploads folder
    for folder_name in os.listdir(base_folder):
        folder_path = os.path.join(base_folder, folder_name)

        # Check if it's a directory
        if os.path.isdir(folder_path):
            all_files[folder_name] = os.listdir(folder_path)

    # Return the structured list of files as JSON
    return jsonify(all_files)


if __name__ == "__main__":
    app.run(debug=True)
