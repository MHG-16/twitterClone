"use client";

import React, { useCallback, useState } from "react";

import Input from "../share/Input";
import Modal from "../share/Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);

      signIn("credentials", { email, password, redirect: false }).then(
        (callback) => {
          if (callback?.ok) {
            toast.success("Logged in");
          }

          if (callback?.error) toast.error(callback.error);
          loginModal.onClose();
          setLoading(false);
          router.refresh()
        }
      );
    } catch (error) {
      toast.error("Something went wrong|");
      loginModal.onClose();
      setLoading(false);
    }
  }, [email, loginModal, password, router]);

  const footer = <FooterModal isLoading={isLoading} />;

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
        type="email"
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        type="password"
      />
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footer}
    />
  );
};

interface BodyFooterModalProps {
  isLoading: boolean;
}

const FooterModal: React.FC<BodyFooterModalProps> = ({ isLoading }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const onToogle = useCallback(() => {
    if (isLoading) return;
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  return (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twitter ?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToogle}
        >
          Create an account
        </span>
      </p>
    </div>
  );
};

export default LoginModal;
