Image Upload App
This project is a full-stack application that allows users to upload images through a React front-end and stores them using an Express back-end with MongoDB. Follow the instructions below to set up and run the application.

Prerequisites
----------------
•Node.js installed on your machine
•MongoDB installed locally or a MongoDB Atlas account for cloud storage
•Firebase account for setting up Cloud Storage

Project Structure
----------------
•gitiuploader/react-app: React front-end application.
•gitiuploader/express-server: Express back-end server.

React App
Setup
---------
1) Clone the repository:
---------------------------
git clone https://github.com/Faizalamin786/gitiuploader.git

2)Navigate to the react-app directory:
----------------------------------
cd gitiuploader/react-app

3)Install dependencies:
---------------------------
npm install

4)Create a Firebase project and set up the Firebase configuration in:
---------------------------------------------------------------
src/firebase.js:

// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    // Your Firebase configuration
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);

5)Start the React app:
------------------
npm start

6)Open http://localhost:3000 in your browser.



Express Server
Setup
-----------------

1)Navigate to the express-server directory:
----------------------------------------
cd gitiuploader/express-server

2)Install dependencies:
---------------------------
npm install

3)Set up MongoDB connection in server.js:
-----------------------------------------
mongoose.connect('mongodb+srv://Faizal:Faizal786@faizal.atlxp5u.mongodb.net/your-database-name', {
});

4)Start the Express server:
-----------------------------
npm start
Open http://localhost:3001 in your browser to check if the server is running.

Notes
-------
•The React app is configured to work with Firebase Cloud Storage. Ensure your Firebase project settings match the configurations in src/firebase.js.
•The Express server handles image uploads and saves them to MongoDB. Check MongoDB connection details and update them in express-server/server.js.
