'use client';

import React, { useCallback, useState } from 'react'

import Input from '../share/Input';
import Modal from '../share/Modal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal'


const LoginModal = () => {
  const loginModal = useLoginModal();
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

  const footer = (<FooterModal isLoading={isLoading} />)

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
        footer={footer}
    />
  )
}

interface BodyFooterModalProps {
  isLoading: boolean
}

const FooterModal : React.FC<BodyFooterModalProps>= ({
  isLoading
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const onToogle = useCallback(() => {
    if(isLoading)  return;
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  return (
    <div className='text-neutral-400 text-center mt-4'>
      <p>
        First time using Twitter ? 
        <span className='text-white cursor-pointer hover:underline' onClick={onToogle}>
          Create an account
        </span>
      </p>
    </div>
  )
}

export default LoginModal