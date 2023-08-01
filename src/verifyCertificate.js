import React, { useState } from 'react'
import axios from 'axios';
import './App.css'
export default function VerifyCertificate() {
  const [message,setMessage]=useState("");

  function validate(e){
    const Id=document.getElementById('id').value;
    e.preventDefault();
    axios.get('http://localhost:3000/api/certificate/'+Id)
    .then(res=>{
      setMessage(res.data.message);
    })
    .catch(err=>{
      console.log(err.response.data.error)
      if(err.response.status===500){
        setMessage("Not Found")
      }else{
        console.log("error=" ,err)
      }
    })
  }
console.log(message)
  return (
    <div>
      <div className="card" >
  <div className="card-body">
    <h5 className="card-title">Verifty a Certificate</h5><br/><br/>
    <form onSubmit={validate}>
      <input type="text" placeholder="Enter Certificate Id" id="id" required /><br/>
    <p className="card-text danger">The Certificate ID can be found at the bottom of each certificate.
</p><br/>
    <input type='submit' className='btn btn-sm btn-success' value="Validate" />
    </form>
  </div>
   { 
   message==="Not Found"?
   <p className='text-center danger'>{message}</p>:<p className='success'>{message}</p>
   }
</div>

    </div>
  )
}
