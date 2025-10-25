import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import axios from 'axios'
import './App.css'

const CertificateForm = () => {
  const [message, setMessage] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('classic')

  const certificateStyles = [
    { id: 'classic', name: 'Classic', color: '#4a5568' },
    { id: 'modern', name: 'Modern', color: '#667eea' },
    { id: 'elegant', name: 'Elegant', color: '#d4af37' },
    { id: 'minimal', name: 'Minimal', color: '#2d3748' }
  ]

  const generatePDF = (certificateData, style) => {
    const doc = new jsPDF('landscape', 'px', 'a4', false);
    
    // Set background based on style
    switch(style) {
      case 'modern':
        doc.setFillColor(102, 126, 234);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        doc.setTextColor(255, 255, 255);
        break;
      case 'elegant':
        doc.setFillColor(212, 175, 55);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        doc.setTextColor(45, 55, 72);
        break;
      case 'minimal':
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        doc.setTextColor(45, 55, 72);
        break;
      default: // classic
        doc.setFillColor(245, 247, 250);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        doc.setTextColor(45, 55, 72);
    }

    // Add border
    doc.setDrawColor(74, 85, 104);
    doc.setLineWidth(15);
    doc.rect(15, 15, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 30);

    // Title
    doc.setFontSize(40);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFICATE OF COMPLETION', doc.internal.pageSize.width / 2, 80, { align: 'center' });

    // Subtitle
    doc.setFontSize(20);
    doc.setFont('helvetica', 'normal');
    doc.text('This is to certify that', doc.internal.pageSize.width / 2, 120, { align: 'center' });

    // Name
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.text(certificateData.name.toUpperCase(), doc.internal.pageSize.width / 2, 160, { align: 'center' });

    // Course description
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    const courseText = `has successfully completed the ${certificateData.course} course`;
    doc.text(courseText, doc.internal.pageSize.width / 2, 190, { align: 'center' });

    // Details section
    doc.setFontSize(14);
    doc.text(`Course: ${certificateData.course}`, 80, 240);
    doc.text(`Date: ${certificateData.date}`, 80, 260);
    doc.text(`Certificate ID: ${certificateData._id}`, 80, 280);

    // Signature
    doc.setFontSize(14);
    doc.text('Signature:', 400, 240);
    doc.setFont('helvetica', 'bold');
    doc.text(certificateData.sign, 400, 260);

    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('This certificate verifies the successful completion of the course.', doc.internal.pageSize.width / 2, 350, { align: 'center' });

    // Generate PDF
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = `certificate_${certificateData.name.replace(/\s+/g, '_')}.pdf`;
    a.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    const date = document.getElementById('date').value;
    const sign = document.getElementById('sign').value;

    const data = {
      name: name,
      course: course,
      date: date,
      sign: sign,
      style: selectedStyle
    }

    axios.post("https://create-verify-certificate.onrender.com/api/certificate", data)
      .then(response => {
        generatePDF(response.data, selectedStyle);
        setMessage({ type: 'success', text: "Certificate Created Successfully!" });
      })
      .catch(err => {
        if (err.response && err.response.status === 500) {
          setMessage({ type: 'error', text: err.response.data.message });
        } else {
          setMessage({ type: 'error', text: "An error occurred. Please try again." });
        }
      })
  }

  return (
    <div className='form-container'>
      <div className='form'>
        <h4>Create Certificate</h4>
        
        {message && (
          <div className={`message-box ${message.type === 'success' ? 'success' : 'danger'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Certificate Style</label>
            <div className="style-selection">
              {certificateStyles.map(style => (
                <div 
                  key={style.id}
                  className={`style-option ${selectedStyle === style.id ? 'active' : ''}`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div 
                    className="style-preview" 
                    style={{ background: style.color }}
                  ></div>
                  {style.name}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter full name" required />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course Name</label>
            <input type="text" id="course" placeholder="Enter course name" required />
          </div>

          <div className="form-group">
            <label htmlFor="date">Completion Date</label>
            <input type="date" id="date" required />
          </div>

          <div className="form-group">
            <label htmlFor="sign">Authorized Signature</label>
            <input type="text" id="sign" placeholder="Enter signature name" required />
          </div>

          <button type="submit" className="submit-btn">
            Generate Certificate
          </button>
        </form>
      </div>
    </div>
  );
};

export default CertificateForm;
