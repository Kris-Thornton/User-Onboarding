import logo from './logo.svg';
import './App.css';
import * as Yup from 'yup'
import React, {useState, useEffect} from 'react'
import axios from 'axios'





function App() {

const [userData, setUserData] = useState({firstname:'', lastname:'', email:'', password:'', agree:false});




const handleChange = (evt => {
  const {type, name, value, checked} = evt.target
  const updatedInfo = type === 'checked' ? checked : value;
 

  setUserData({...userData, [name]:updatedInfo})
})






  return (
    <div >
      <header style={{backgroundColor:'lightcoral'}}><h1>Welcome New Users!</h1></header>
        <form >
          <h2 >Please enter your first and last name.</h2>
          <div style={{display: 'flex', flexDirection: 'column',justifyContent:'space-around', backgroundColor:'lightgrey', fontWeight:'bold', rowGap: '10px'}}>
          <label>FirstName:&nbsp;
            <input type='text' name='firstname' value={userData.firstname} onChange={handleChange}/>
          </label>
          <label>LastName:&nbsp;
            <input type='text'name='lastname' value={userData.lastname} onChange={handleChange}/>
          </label>
          <label>Email:&nbsp;
            <input type='text'name='email' value={userData.email} onChange={handleChange}/>
          </label>
          <label>Password:&nbsp;
            <input type='password'name='password' value={userData.password} onChange={handleChange}/>
          </label>
          <label>Terms of Service:&nbsp;
            <input type='checkbox'name='agree' checked={userData.agree} onChange={handleChange}/>
          </label>
          </div>
          
          <button>Submit</button>
        </form>
    </div>
  );
}

export default App;
