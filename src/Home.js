import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'

export default function Home() {
  return (
    <div className='home'>
      <div className="home-header">
        <h1>Certificate Generator</h1>
        <p>Create professional certificates with multiple styles and verify them securely</p>
      </div>
      
      <div className="button-container">
        <button className="btn-primary">
          <Link to="/generateCertificate">Generate Certificate</Link>
        </button>
        <button className="btn-secondary">
          <Link to="/verifyCertificate">Verify Certificate</Link>
        </button>
      </div>

      <div className="home-image-container">
        <img 
          src='https://d2vyhi5ouo1we3.cloudfront.net/force_jpg/aHR0cHM6Ly9pbWFnZXMuYmFubmVyYmVhci5jb20vcmVxdWVzdHMvaW1hZ2VzLzAwOC85MjQvNTc5L29yaWdpbmFsL2VhYzQyY2FiZjM5YzIxY2Y4NThlNWY4NDRlZmM0YTA1MjJmOGUxNzkucG5nPzE2MzI4MDgzMDI=/image.jpg' 
          alt="Certificate Example" 
          className="home-image"
        />
      </div>
    </div>
  )
}
