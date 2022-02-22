import React, { useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PasswordReset() {
  const emailRef = useRef();
  const history = useHistory();
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for futher instructions');
    } catch {
      setError('Failed to reset password');
    }
  };

  return (
    <div className="custom-login-bg relative ">
      <Header />
      <div className="mx-auto flex justify-center text-center md:h-4/6 items-center ">
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
        <div>
          <p className="font-black text-xl uppercase mb-8">password reset</p>
          <form action="" id="login-form" onSubmit={handleReset}>
            <div className="flex flex-col items-center justify-between">
              <input
                type="email"
                className="custom-input m-2 px-6 py-2"
                placeholder="email"
                ref={emailRef}
              />
              <button
                type="submit"
                className="custom-btn text-white m-2 px-6 py-2"
              >
                RESET PASSWORD
              </button>
            </div>
          </form>
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
