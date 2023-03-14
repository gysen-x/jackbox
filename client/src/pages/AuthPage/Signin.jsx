import React, { useState } from 'react';

export default function Signin() {
  const [userSignin, setUserSignin] = useState({ email: '', password: '' });
  const [errorSignin, setErrorSignin] = useState('');
  const [alertClass, setAlertClass] = useState('d-none');

  const handleChange = (event) => {
    setUserSignin({ ...userSignin, [event.target.name]: event.target.value });
    console.log('user: ', userSignin);
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/signin ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userSignin),
      });
      if (response.status !== 200) {
        const data = await response.json();
        setErrorSignin(capitalize(data.errMsg));
        setAlertClass('alert alert-danger');
      } else {
        setAlertClass('alert alert-success');
        setErrorSignin("Well done! You're logged in!");
      }
      setUserSignin({ username: '', email: '', password: '' });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={formSubmitHandler}
      >
        <h1> Sign In</h1>
        <div className="mb-3">
          <label
            className="form-label w-100"
            htmlFor="exampleInputEmail1"
          >
            <div
              className="form-text"
              id="usernameText"
            >
              Email address
            </div>
            <input
              className="form-control"
              id="exampleInputEmail1"
              type="email"
              name="email"
              value={userSignin.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label
            className="form-label w-100"
            htmlFor="exampleInputPassword1"
          >
            <div
              id="usernameText"
              className="form-text"
            >
              Password
            </div>
            <input
              className="form-control"
              id="exampleInputPassword1"
              type="password"
              name="password"
              value={userSignin.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={alertClass} role="alert">
          {errorSignin}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
