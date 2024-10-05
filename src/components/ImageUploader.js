import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../firebase"; // Assuming this file exports initialized Firebase
import styles from '../styling/imageUploader.module.css'; // Import the CSS module

const ImageUploader = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    // Create a URL for the selected file to show a preview
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleImageUpload = () => {
    if (!selectedFile) return;

    const storage = getStorage();
    const storageRef = ref(storage, `uploads/${selectedFile.name}`);

    // Start file upload to Firebase
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    // Listen for state changes (progress, success, error)
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        setUploadStatus('Uploading...');
      }, 
      (error) => {
        setUploadStatus('Upload failed. Please try again.');
      }, 
      () => {
        // Upload completed successfully
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadStatus('Upload successful!');
          setProgress(100);
          onImageUpload(downloadURL); // Pass the URL to parent component
        });
      }
    );
  };

  return (
    <div className={styles.container}>
      <h3>Upload Image</h3>
      <div className={styles.uploadBox}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => handleFileChange(e.target.files[0])}
          className={styles.fileInput} 
        />
        <p className={styles.uploadText}>Click or Drag to Upload</p>
      </div>

      {/* Show image preview if a file is selected */}
      {previewURL && (
        <div className={styles.previewContainer}>
          <img src={previewURL} alt="Preview" className={styles.imagePreview} />
          <div className={styles.actions}>
            <button onClick={handleImageUpload} className={styles.sendButton}>Send</button>
          </div>
        </div>
      )}

      {/* Show progress and status */}
      {uploadStatus && (
        <p className={styles.uploadStatus}>
          {uploadStatus} ({Math.round(progress)}%)
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
