'use client';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from '../share/Button';
import Avatar from '../share/Avatar';
import useLoginModal from '@/app/hooks/useLoginModal';


interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
  currentUser: {currentUser: User} | null
}
const Form : React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId,
  currentUser
}) => {

  
  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      {currentUser ? <WhenUserConnected 
        user={currentUser.currentUser}  placeholder={placeholder} 
        postId={postId} isComment={isComment}
      /> : <HeaderWhenUserNotConnected />}
    </div>
  )
}


const HeaderWhenUserNotConnected = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  return (
    <div className='py-8'>
        <h1 className='text-white text-2xl 
        text-center mb-4 font-bold'>
          Welcome to Twitter
        </h1>
        <div className='flex flex-row items-center justify-center gap-4'>
          <Button label='Login' onClick={loginModal.onOpen}/>
          <Button label='Register' onClick={registerModal.onOpen}/>
        </div>
      </div>
  )
}

interface WhenUserConnectedProps{
  user: User,
  placeholder: string,
  postId?: string,
  isComment?: boolean
}
const WhenUserConnected : React.FC<WhenUserConnectedProps>= ({
  user : currentUser,
  placeholder,
  isComment,
  postId
}) => {
  const [body, setBody] = useState('');
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(async () => {
    try{
      setLoading(true);

      const url = isComment ? `/api/comments/${postId}` : '/api/posts';

      await axios.post( url , { body });

      setBody('');
      toast.success("Tweet created");
      router.refresh();
    }catch(error){
      toast.error("Something went wrong!")
    } finally {
      setLoading(false);
    }
  }, [body, isComment, postId, router]);
  
  return (
    <div className={"flex flex-row gap-4"}>
      <div>
        <Avatar user={currentUser}/>
      </div>
      <div className='w-full'>
        <textarea disabled={isLoading}
          onChange={(e) => setBody(e.target.value)}
          value={body}
          className='disabled:opacity-80 peer resize-none
          mt-3 w-full bg-black ring-0 outline-none text-lg
          placeholder-neutral-500 text-white' 
          placeholder={placeholder}
        ></textarea>
        <hr 
          className='opacity-0 peer-focus:opacity-100
          h-[1px] w-full border-neutal-800 transition'
        />
        <div className='mt-4 flex flex-row justify-end'>
          <Button label='Tweet' onClick={onSubmit}/>
        </div>
      </div>
    </div>
  )
}
export default Form