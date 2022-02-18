import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      history.push('/myprocedure');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/myprocedure');
    } catch {
      setError('Failed to login');
    }
  };

  return (
    <div className="custom-login-bg relative ">
      <Header />
      <div className="mx-auto flex justify-center text-center md:h-4/6 items-center ">
        <div>
          <p className="font-black text-xl uppercase mb-8">PROVIDER LOGIN</p>
          {error && <p>{error}</p>}
          <form action="" id="login-form" onSubmit={handleLogin}>
            <div className="flex flex-col items-center justify-between">
              <input
                type="email"
                className="custom-input m-2 px-6 py-2"
                placeholder="email"
                ref={emailRef}
              />
              <input
                type="password"
                className="custom-input m-2 px-6 py-2"
                placeholder="password"
                ref={passwordRef}
              />
              <button
                type="submit"
                className="custom-btn text-white m-2 px-6 py-2"
              >
                LOGIN
              </button>
            </div>
          </form>
          <p className="font-black text-xl uppercase mt-8">NEW PROVIDER</p>
          <button
            className="custom-btn text-white  px-6 py-2"
            onClick={() => {
              history.push('/signup');
            }}
          >
            SIGN UP
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
