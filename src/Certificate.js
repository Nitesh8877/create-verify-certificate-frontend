import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Create this CSS file to add custom styles

const Certificate = ({ name, course, date, signatureUrl }) => {
  return (
    <div className="certificate-container">
      <div className="certificate-background">
        <div className="certificate-content">
          <div className="certificate-header">
            <img src={signatureUrl} alt="Signature" className="certificate-signature" />
            <h1 className="certificate-title">Certificate of Completion</h1>
          </div>
          <div className="certificate-info">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Course:</strong> {course}</p>
            <p><strong>Date:</strong> {date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
