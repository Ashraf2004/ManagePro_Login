import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [users, setUsers] = useState([]); // Changed "data" to "users" for clarity
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Fetch user data from an API using axios
    axios.get('https://backend1-zial.onrender.com/studentRoute/')
      .then(response => {
        const responseData = response.data; // Assuming the response data is an array
        setUsers(responseData);
        console.log(responseData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submitted email:', email);
    console.log('Submitted password:', password);

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      setLoginSuccess(true);
      setLoginError('');
      window.location.href = 'https://manage-pro-todo-list-6n1c.vercel.app/';
    } else {
      setLoginSuccess(false);
      setLoginError('Login failed. Please check your email and password.');
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder='Enter Email' name='email' className='form-control rounded-0' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter Password' name='password' className='form-control rounded-0' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
          {loginSuccess ? (
            <p>Login successful</p>
          ) : (
            <p>{loginError}</p>
          )}
          <p>You agree to our terms and policies</p>
          <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default App;
