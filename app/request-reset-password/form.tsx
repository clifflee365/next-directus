'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function RequestResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const reset_url = `${process.env.NEXT_PUBLIC_URL}/reset-password`;

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        email,
        reset_url
      })
    })

    if(response.status === 201){
      setSuccess("An email with a password reset link has been sent to your email!");  
    } else {
      setError('An error occurred, please try again!');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Reset your password</h1>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
      <p>
        Enter your registered email and a reset password link will be sent to
        you
      </p>
      <input
        type="email"
        placeholder="Email Address"
        name="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button>Send Reset Link</button>
      <Link href="/login">Login page</Link>
    </form>
  );
}