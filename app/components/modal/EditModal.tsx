'use client';

import useEditModal from "@/app/hooks/useEditModal";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../share/Modal";
import Input from "../share/Input";
import { useRouter } from "next/navigation";
import ImageUpload from "../share/ImageUpload";

interface EditModalProps {
  user: { currentUser: User } | null;
}
const EditModal: React.FC<EditModalProps> = ({ user }) => {
  const editModal = useEditModal();
  const router = useRouter();
  
  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setcoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if(!user?.currentUser) return;
    setProfileImage(user.currentUser?.profileImage || "");
    setcoverImage(user?.currentUser?.coverImage || "");
    setName(user?.currentUser?.name || "");
    setBio(user?.currentUser?.bio || "");
    setUsername(user?.currentUser?.username || "");
  }, [user?.currentUser]);

  const onSubmit = useCallback(async () => {
    try{
        setLoading(true);
        axios.post('/api/users', {
            name,
            username,
            profileImage,
            coverImage,
            bio
        }).then(() => toast.success("user Edited!"))
        .catch(() => toast.error("user was not Edited"))
        .finally(() => {setLoading(false)
            editModal.onClose();
            router.refresh();
        })
    }catch(error){
        toast.error("Something went wrong.")
    }
  }, [bio, coverImage, editModal, name, profileImage, router, username])
  const body= (<ModalContent 
    name={name}
    setName={setName}
    userName={username}
    setUserName={setUsername}
    bio={bio}
    setBio={setBio}
    isLoading={isLoading}
    profileImage={profileImage}
    setProfileImage={setProfileImage}
    coverImage={coverImage}
    setCoverImage={setcoverImage}
  />)
  return <Modal 
    disabled={isLoading} isOpen={editModal.isOpen}
    title="Edit your profile"
    actionLabel="Save" onClose={editModal.onClose}
    onSubmit={onSubmit} body={body}
  />;
};

interface ModalContentProps {
    name: string;
    setName: (name: string) => void;
    userName: string;
    setUserName: (userName: string) => void;
    bio: string;
    setBio: (bio: string) => void;
    profileImage: string;
    setProfileImage: (url: string) => void;
    isLoading: boolean;
    coverImage: string;
    setCoverImage: (url: string) => void;
}
const ModalContent : React.FC<ModalContentProps> = ({
    name,
    setName,
    userName,
    setUserName,
    bio,
    setBio,
    profileImage,
    setProfileImage,
    coverImage,
    setCoverImage,
    isLoading
})  => {
    return (
        <div className="flex flex-col gap-4">ù
            <ImageUpload 
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label="Upload profile image"
            />
            <ImageUpload 
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label="Upload cover image"
            />
            <Input 
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input 
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <Input
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
        </div>
    )
}
export default EditModal;
