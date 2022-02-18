import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Password does not match');
    }

    try {
      setError('');
      setLoading(true);
      const response = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(response.user.uid);
      history.push('/dashboard');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  };

  return (
    <div className="custom-login-bg relative ">
      <Header />
      {currentUser && currentUser.email}
      {error && <p>{error}</p>}
      <div className="mx-auto flex justify-center text-center md:h-4/6 items-center ">
        <div>
          <p className="font-black text-xl uppercase mb-8">REGISTRATION</p>
          <form action="" id="signup-form" onSubmit={handleSignUp}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <input
                type="text"
                className="custom-input m-2 px-6 py-2"
                placeholder="provider name"
              />
              <input
                type="text"
                className="custom-input m-2 px-6 py-2"
                placeholder="name of practise"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between"></div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <input
                type="email"
                className="custom-input m-2 px-6 py-2"
                placeholder="email"
                ref={emailRef}
              />
              <input
                type="text"
                className="custom-input m-2 px-6 py-2"
                placeholder="specialty"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <input
                type="text"
                className="custom-input m-2 px-6 py-2"
                placeholder="state"
              />
              <div className="custom-input m-2 px-6 py-2">
                <label for="files" class="btn">
                  UPLOAD ID
                </label>
                <input id="files" className="hidden" type="file" />
              </div>
            </div>
            <div className="flex flex-col items-center md:px-2">
              <input
                type="password"
                ref={passwordRef}
                className="custom-input m-2 px-6 py-2"
                placeholder="password"
              />
              <input
                type="password"
                ref={confirmPasswordRef}
                className="custom-input m-2 px-6 py-2"
                placeholder="confirm password"
              />
            </div>
            <div className="px-2">
              <button
                type="submit"
                className="custom-btn text-white my-2 px-6 py-2"
                disabled={loading}
              >
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
