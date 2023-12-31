import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import CertificateForm from './generateCertificate';
import VerifyCertificate from './verifyCertificate';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Certificate from './Certificate';
const certificateData = {
  name: 'John Doe',
  course: 'React Mastery',
  date: 'August 1, 2023',
  sign: 'path/to/signature.png', // Replace this with the actual URL or file path of the signature image
};
export default function App() {
  return (
    <div className='app' >
    <Router>
    <Routes>
      <Route
      exact 
      path='/'
      element={<Home/>}
      />
      <Route 
      exact
      path='/generateCertificate'
      element={
       <CertificateForm/>
     }
      />
      <Route
      exact
      path='/verifyCeritficate'
     element={
      <VerifyCertificate/>
     }
      />
        <Route
      exact
      path='/certificate'
     element={
      <Certificate {...certificateData}/>
     }
      />
    </Routes>
  </Router>
  </div>
  )
}
