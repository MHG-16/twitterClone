'use client';

import React, { useCallback, useState } from 'react'

import Input from '../share/Input';
import Modal from '../share/Modal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal'


const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);


  const onSubmit = useCallback(async() => {
    try{
        setLoading(true);

        // TODO

        loginModal.onClose();
    }catch(error) {
        console.log(error);
    }
  }, [loginModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
        <Input 
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
        />
        <Input 
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
        />
    </div>
  )
  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Sign in'
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
    />
  )
}

export default LoginModal