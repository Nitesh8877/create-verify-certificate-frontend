import React, { useState } from 'react'
import axios from 'axios';
import './App.css'

export default function VerifyCertificate() {
  const [message, setMessage] = useState("");
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = (e) => {
    e.preventDefault();
    const Id = document.getElementById('id').value.trim();
    
    if (!Id) {
      setMessage({ type: 'danger', text: "Please enter a certificate ID" });
      return;
    }

    setLoading(true);
    setMessage("");
    setCertificateData(null);

    axios.get('https://create-verify-certificate.onrender.com/api/certificate/' + Id)
      .then(res => {
        setMessage({ type: 'success', text: "Certificate verified successfully!" });
        setCertificateData(res.data);
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          setMessage({ type: 'danger', text: "Certificate not found. Please check the ID and try again." });
        } else {
          setMessage({ type: 'danger', text: "An error occurred. Please try again." });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className='verify-container'>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Verify Certificate</h5>
          <p className="card-text">
            Enter the Certificate ID to verify its authenticity
          </p>
          
          <form onSubmit={validate}>
            <input 
              type="text" 
              placeholder="Enter Certificate ID" 
              id="id" 
              required 
            />
            
            <button 
              type="submit" 
              className="btn-validate"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Validate Certificate'}
            </button>
          </form>

          {message && (
            <div className={`message-box ${message.type}`}>
              {message.text}
            </div>
          )}

          {certificateData && (
            <div className="certificate-preview mt-4">
              <div className="success message-box">
                <h6>Certificate Details:</h6>
                <p><strong>Name:</strong> {certificateData.name}</p>
                <p><strong>Course:</strong> {certificateData.course}</p>
                <p><strong>Date:</strong> {certificateData.date}</p>
                <p><strong>Certificate ID:</strong> {certificateData._id}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
