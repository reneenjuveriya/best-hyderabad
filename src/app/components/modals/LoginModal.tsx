'use client';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import Heading from "../Heading";
import Input from "../input/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const LoginModal = () => {
    const router= useRouter();
    const RegisterModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setisLoading] = useState(false);


    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            email: '',
            password: ''
        }
    })

    const toggle = useCallback(() => {
        loginModal.onClose();
        RegisterModal.onOpen();
    },[loginModal, RegisterModal])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setisLoading(false);

            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome back"
                subtitle="Login to your account!"    
            />
            <Input 
                id="email" 
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            
            <Input 
                id="password" 
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )


    const footerContent = (
        <div className="flex flex-col gap-4 mt-3"> 
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            />
            <div className="
                text-neutral-500 text-center
                mt-4
                font-light"
            >
                <div className="text-center flex flex-row items-center gap-2">

                    <div>
                        First time using Best Hyderabad ? 
                    </div>
                    <div 
                        onClick={toggle}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline"
                    >
                        Create an account
                    </div>
                </div>


            </div>
        </div>
    )


  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal
