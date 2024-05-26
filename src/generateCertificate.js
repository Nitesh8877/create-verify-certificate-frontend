import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import axios from 'axios'
import './App.css'
const CertificateForm = () => {
const [message,setMessage]=useState('')
  const handleFormSubmit = ({name,course,date,sign,_id}) => {
    // e.preventDefault();
    // Create a new PDF document
    console.log(name,course,date,sign)
    const doc = new jsPDF('landscape','px','a4','false');
    // Add content to the PDF
    doc.setFontSize(30);
    doc.setFont('Helvertica','bold')
    doc.text(`${course}`, 300, 60);
    doc.text(`CERTIFICATE`, 250, 90);
    doc.setFont('courier')
    doc.setFontSize(15);
    doc.text(`${name}`, 272, 110);
    doc.setFontSize(12);
    doc.setFont('Helvertica','bold')
    doc.text(`Professional certifications ${course} are  association, or institution. They generally represent mastery of a certain skill set.   `,70,170);
    doc.text('The requirements to qualify for a certification depends on the specific certification, though may include educational instruction.',70,180);
    doc.setFont('Helvertica','Normal')
    doc.setFontSize(20);
    doc.text(`DATE: ${date}`,80,400 )
    doc.setFont('Helvertica','Bold')
    doc.setFontSize(20);
    doc.text(`SIGNATURE: ${sign}`,370,400)
    doc.setFont('Helvertica','Normal')
    doc.setFontSize(20);
    doc.text(`Certificate Id: ${_id}`,80,420 )
    // Save the PDF as a Blob
    const pdfBlob = doc.output('blob');

    // Generate a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Trigger the PDF download
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'certificate.pdf';
    a.click();
  };

  const certificate=(e)=>{
    const name=document.getElementById('name').value;
    const course=document.getElementById('course').value;
    const date=document.getElementById('date').value;
    const sign=document.getElementById('sign').value;
    e.preventDefault();
    let data={
        name:name,
        course:course,
        date:date,
        sign:sign
    }
    axios.post("https://create-verify-certificate.onrender.com/api/certificate",data)
    .then(response=>{
         console.log(response)
        handleFormSubmit(response.data);
        alert("Certificate Created Succussfully!");
        if(response.status==201){
            // window.location.href='/'
        }
    })
    .catch(err=>{
      if(err.response && err.response.request.status===500 || err.response.status==500)
      setMessage(err.response.data.message)
      else
      console.log(err)
    })
    
  }

  return (
    
    <div className='generate'>
        <h4 className="text-center">Create Certificate</h4><br/>
        <form onSubmit={certificate}>
            <div>
                <input type="text" className="form-control" placeholder="Name" id="name" required />
            </div><br/>

            <div>
                <input type="text" className="form-control" placeholder="Course" id="course" required />
            </div><br/>
            <div>
            <input type="date" className="form-control" placeholder="Date"  id="date" required />
            </div><br/>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="singer" id="sign" required />
            </div><br/>

            <div className="input-group m-1">
                <input type="submit" className="form-control btn btn-primary m-1" value="Generate Pdf" />
            </div>

        </form>
    </div>
);
};

export default CertificateForm;
