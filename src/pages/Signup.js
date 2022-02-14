import React, { useRef } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <div className="custom-login-bg relative ">
      <Header />
      <div className="mx-auto flex justify-center text-center h-4/6 items-center ">
        <div>
          <p className="font-black text-xl uppercase mb-8">REGISTRATION</p>
          <form action="" id="signup-form">
            <div className="flex justify-between">
              <input
                type="text"
                className="custom-input m-2 p-2"
                placeholder="provider name"
              />
              <input
                type="text"
                className="custom-input m-2 p-2"
                placeholder="name of practise"
              />
            </div>
            <div className="flex justify-between"></div>
            <div className="flex justify-between">
              <input
                type="email"
                className="custom-input m-2 p-2"
                placeholder="email"
                ref={emailRef}
              />
              <input
                type="text"
                className="custom-input m-2 p-2"
                placeholder="specialty"
              />
            </div>
            <div className="flex justify-between">
              <input
                type="text"
                className="custom-input m-2 p-2"
                placeholder="state"
              />
              <div className="custom-input m-2 p-2">
                <label for="files" class="btn">
                  UPLOAD ID
                </label>
                <input id="files" className="hidden" type="file" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <input
                type="password"
                ref={passwordRef}
                className="custom-input m-2 p-2"
                placeholder="password"
              />
              <input
                type="password"
                ref={confirmPasswordRef}
                className="custom-input m-2 p-2"
                placeholder="confirm password"
              />
            </div>

            <button type="submit" className="custom-btn text-white m-2 p-2">
              REGISTER
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
