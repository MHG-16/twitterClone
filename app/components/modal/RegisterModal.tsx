'use client';

import React, { useCallback, useState } from 'react'

import Input from '../share/Input';
import Modal from '../share/Modal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal'


const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setLoading] = useState(false);


  const onSubmit = useCallback(async() => {
    try{
        setLoading(true);

        // TODO

        registerModal.onClose();
    }catch(error) {
        console.log(error);
    }
  }, [registerModal]);

  const bodyContent = (
    <BodyModal isLoading={isLoading}/>
  );

  const footerContent = (
    <FooterModal isLoading={isLoading}/>
  );

  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Create an account'
        actionLabel='Register'
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

interface BodyFooterModalProps {
  isLoading: boolean
}

const BodyModal : React.FC<BodyFooterModalProps> = ({
  isLoading
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("")
  return (
    <div className='flex flex-col gap-4'>
        <Input 
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
        />
        <Input 
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
        />
        <Input 
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
}


const FooterModal : React.FC<BodyFooterModalProps>= ({
  isLoading
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const onToogle = useCallback(() => {
    if(isLoading)  return;
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  return (
    <div className='text-neutral-400 text-center mt-4'>
      <p>
        Already have an account ? 
        <span className='text-white cursor-pointer hover:underline' onClick={onToogle}> Sign in</span>
      </p>
    </div>
  )
}
export default RegisterModal;