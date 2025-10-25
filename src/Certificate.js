import React from 'react';
import './App.css';

const Certificate = ({ name, course, date, signature, certificateId, style = 'classic' }) => {
  const getCertificateClass = () => {
    return `certificate certificate-${style}`;
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="certificate-container">
      <div className={getCertificateClass()}>
        <div className="certificate-content">
          <div className="certificate-border">
            <div className="certificate-header">
              <div className="certificate-badge">
                ✓
              </div>
              <h1 className="certificate-title">Certificate</h1>
              <p className="certificate-subtitle">of Completion</p>
            </div>

            <div className="certificate-body">
              <p className="certificate-presented">This is to certify that</p>
              <h2 className="certificate-name">{name}</h2>
              <p className="certificate-description">
                has successfully completed the course and demonstrated proficiency in the subject matter through comprehensive assessment and practical application.
              </p>

              <div className="certificate-details">
                <div className="detail-item">
                  <div className="detail-label">Course</div>
                  <div className="detail-value">{course}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Date Completed</div>
                  <div className="detail-value">{date || getCurrentDate()}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Certificate ID</div>
                  <div className="detail-value">{certificateId}</div>
                </div>
              </div>
            </div>

            <div className="certificate-footer">
              <div className="footer-item">
                <div className="footer-label">Date Issued</div>
                <div className="footer-value">{getCurrentDate()}</div>
              </div>
              <div className="footer-item">
                <div className="footer-label">Authorized Signature</div>
                <div className="footer-value">{signature}</div>
                {signature && <div className="signature-line"></div>}
              </div>
            </div>

            {certificateId && (
              <div className="certificate-id">
                Certificate ID: {certificateId}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
