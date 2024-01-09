// src/App.js
import React, {useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';
import { imageDb } from './firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import './App.css';

function App() {
  const [img]= useState('')
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [imgUrl, setImgUrl] = useState([]);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
      setShowCamera(false);
  
    };

    reader.readAsDataURL(file);
  };

 

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  const webcamRef = React.useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUploadedImage(imageSrc);
    setShowCamera(false);
  };
  useEffect(() => {
    listAll(ref(imageDb, "files")).then(imgs => {
        imgs.items.forEach(val => {
            getDownloadURL(val).then(url => {
                setImgUrl(data => [...data, url]);
            });
        });
    });
}, []);
const handleClick = () => {
  if (img !== null) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then(value => {
          getDownloadURL(value.ref).then(url => {
              setImgUrl(data => [...data, url]);
          });
      });
      alert("Image uploaded!"); // Show alert on button click
  }
};
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Upload App</h1>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag & drop an image here, or click to select one</p>
          <button className="upload-button" onClick={() => setShowCamera(false)}>
            Upload Image
          </button>
          <button className="camera-button" onClick={() => setShowCamera(true)}>
            Use Camera
          </button> 
        </div>
       
                <button onClick={handleClick}>Upload</button>
            
        <div>
          {showCamera && (
            <div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image"
                type='file'
                className="webcam"
              />
              <button onClick={captureImage} className="capture-button">
                Capture Image
              </button>
            </div>
          )}
        </div>
        {uploadedImage && (
          <div>
            <h2>Uploaded Image Preview:</h2>
            <img src={uploadedImage} alt="Uploaded" className="preview-image" />
          </div>
        )}
        
         
            
      </header>
    </div>
  );
}

export default App;
