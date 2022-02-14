import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="absolute inset-x-0 bottom-0 w-64  mx-auto my-4 text-center">
      {window.location.pathname === '/signup' ? (
        <p className="m-0 text-sm">
          By clicking ”Register”, I agree to terms of use
          <Link className="underline">(legal disclaimer Here)</Link>
        </p>
      ) : (
        <p className="m-0 text-sm">Copyright ChonaMedTech, LLC</p>
      )}
    </footer>
  );
}
