import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

  const handleFile = (e) => {
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    setFile(uploadedFile);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const storage = getStorage();
    const fileRef = ref(storage, file.name);
    const signupForm = document.querySelector('#signup-form');
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Password does not match');
    }

    try {
      const response = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(response.user.uid);
      uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(fileRef).then((url) => {
          console.log(url);
          db.collection('providers').doc(response.user.uid).set({
            name: signupForm['name'].value,
            email: emailRef.current.value,
            practise: signupForm['practise'].value,
            specialty: signupForm['specialty'].value,
            state: signupForm['state'].value,
            photoUrl: url,
          });
          history.push('/dashboard');
        });
      });
    } catch {
      setError('Failed to register');
    }

    setLoading(false);
  };

  return (
    <div className="custom-login-bg relative ">
      <Header />

      <div className="mx-auto flex justify-center text-center md:h-4/6 items-center ">
        <div>
          {error && <p className="mb-4 font-black text-lg">{error}</p>}
          <p className="font-black text-xl uppercase mb-8">REGISTRATION</p>
          <form action="" id="signup-form" onSubmit={handleSignUp}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <input
                type="text"
                className="custom-input m-2 px-6 py-2"
                placeholder="provider name"
                name="name"
                required
              />
              <input
                type="text"
                className="custom-input m-2 px-6 py-2"
                placeholder="name of practise"
                name="practise"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between"></div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <input
                type="email"
                className="custom-input m-2 px-6 py-2"
                placeholder="email"
                ref={emailRef}
                required
              />
              <input
                type="text"
                className="custom-input m-2 px-6 py-2"
                placeholder="specialty"
                name="specialty"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <input
                type="text"
                className="custom-input m-2 px-6 py-2"
                placeholder="state"
                required
                name="state"
              />
              <div className="custom-input m-2 px-6 py-2">
                <label for="files" className="btn">
                  UPLOAD ID
                </label>
                <input
                  id="files"
                  className="hidden"
                  type="file"
                  required
                  onChange={handleFile}
                />
              </div>
            </div>
            <div className="flex flex-col items-center md:px-2">
              <input
                type="password"
                ref={passwordRef}
                className="custom-input m-2 px-6 py-2"
                placeholder="password"
                required
              />
              <input
                type="password"
                ref={confirmPasswordRef}
                className="custom-input m-2 px-6 py-2"
                placeholder="confirm password"
                required
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
