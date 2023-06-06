import logo from './logo.svg';
import './App.css';
import * as Yup from 'yup'
import React, {useState, useEffect} from 'react'
import axios from 'axios'





function App() {
// --------------------------------------------------------
const [userData, setUserData] = useState({firstname:'', lastname:'', email:'', password:'', agree:false});
const [errors, setErrors] = useState({firstname:'', lastname:'', email:'', password:'', agree:false})
const [buttonDisabled, setButtonDisabled] = useState(true)
const [post, setPost] = useState([]);
// --------------------------------------------------------

const handleChange = (evt => {
  const {type, name, value, checked} = evt.target
  const updatedInfo = type === 'checkbox' ? checked : value;
 
Yup.reach(formSchema, name).validate(updatedInfo).then(valid => {
  setErrors({
    ...errors, [name]: ''
  })
}).catch(err => {
  setErrors({
    ...errors, [name]: err.errors[0]
  })
})

  setUserData({...userData, [name]:updatedInfo})
})


// --------------------------------------------------------



useEffect(() => {
  formSchema.isValid(userData).then(valid => {
    setButtonDisabled(!valid)
  })
}, [userData])

// --------------------------------------------------------

const handleSubmit = (evt) => {
  // evt.preventDefalut();
  setUserData({...userData})
  axios
    .post("https://reqres.in/api/users", userData)
    .then(res => {
      console.log(res)
      setPost(res.data, ...post);
      <pre>{JSON.stringify(post, null, 2)}</pre>
      console.log('success', res);
    })
    .catch(err => console.log(err.response));
    // .finally(() => setUserData(userData))
}



// --------------------------------------------------------

const formSchema = Yup.object().shape({
  firstname: Yup
    .string()
    .trim()
    .min(3, 'Must be at least 3 characters long')
    .required('First name is required to submit'),
  lastname: Yup
    .string()
    .trim()
    .required('Last name is required to submit'),
  email: Yup
    .string()
    .email('Must be a vaild email')
    .required('Please enter an email to submit'),
  password: Yup
    .string()
    .required('Please enter you password to submit')
    .min(8, 'A min of 8 characters are required for a secure password'),
  agree: Yup.boolean().oneOf([true], 'Must accept the Terms')
  
    
})
// --------------------------------------------------------





  return (
    <div >
      <header style={{backgroundColor:'lightcoral'}}><h1>Welcome New Users!</h1></header>
        <form onSubmit={handleSubmit}>
          <h2 >Please enter your first and last name.</h2>
          <div style={{display: 'flex', flexDirection: 'column',justifyContent:'space-around', backgroundColor:'lightgrey', fontWeight:'bold', rowGap: '10px'}}>
          <label>FirstName:&nbsp;
            <input type='text' name='firstname' value={userData.firstname} onChange={handleChange}/>
            {errors.firstname.length>0 &&<p>{errors.firstname}</p>}
          </label>
          <label>LastName:&nbsp;
            <input type='text'name='lastname' value={userData.lastname} onChange={handleChange}/>
            {errors.lastname.length>0 &&<p>{errors.lastname}</p>}
          </label>
          <label>Email:&nbsp;
            <input type='text'name='email' value={userData.email} onChange={handleChange}/>
            {errors.email.length>0 &&<p>{errors.email}</p>}
          </label>
          <label>Password:&nbsp;
            <input type='password'name='password' value={userData.password} onChange={handleChange}/>
            {errors.password.length>0 &&<p>{errors.password}</p>}
          </label>
          <label>Terms of Service:&nbsp;
            <input type='checkbox'name='agree' checked={userData.agree} onChange={handleChange}/>
            {errors.agree}
          </label>
          {post.map(user => {
            <div key={user.id}>
              {user.createdAt}
              {user.email}
            </div>
          })}
          </div>
          
          <button disabled={buttonDisabled}>Submit</button>
        </form>
    </div>
  );
}

export default App;
