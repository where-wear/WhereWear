'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
const SignOut = () => {
  return (
    <>
      <button
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
    </>
  );
};

export default SignOut;
