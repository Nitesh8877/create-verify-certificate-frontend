import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import './App.css'
export default function Home() {
  return (
    <>
    <div className='home'>
        <Button ><Link to="/generateCertificate">Generate Certificate</Link> </Button>
        <Button ><Link to="/verifyCeritficate">Verify Certificate</Link></Button>
        </div>
    <div>
    <img src='https://d2vyhi5ouo1we3.cloudfront.net/force_jpg/aHR0cHM6Ly9pbWFnZXMuYmFubmVyYmVhci5jb20vcmVxdWVzdHMvaW1hZ2VzLzAwOC85MjQvNTc5L29yaWdpbmFsL2VhYzQyY2FiZjM5YzIxY2Y4NThlNWY4NDRlZmM0YTA1MjJmOGUxNzkucG5nPzE2MzI4MDgzMDI=/image.jpg'/>
    </div>
    </>
  )
}
