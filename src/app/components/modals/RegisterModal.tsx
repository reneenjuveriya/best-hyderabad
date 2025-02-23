'use client';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import Modal from "./Modal";
import { useState } from "react";
import {
    FieldValue,
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


const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const [isLoading, setisLoading] = useState(false);


    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true);

        axios.post('/api/register',data)
        .then(() =>{
            RegisterModal.onClose();
        })
        .catch((error) =>{
            toast.error('Something went wrong.')
        })
        .finally(() => {
            setisLoading(false);
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to Best Hyderabad"
                subtitle="Create an Account!"    
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
                id="name" 
                label="Name"
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
                onClick={() => {}}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div className="
                text-neutral-500 text-center
                mt-4
                font-light"
            >
                <div className="text-center flex flex-row items-center gap-2">

                    <div>
                        Already have an account ? 
                    </div>
                    <div 
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline"
                    >
                        Log in
                    </div>
                </div>


            </div>
        </div>
    )


  return (
    <Modal 
        disabled={isLoading}
        isOpen={RegisterModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={RegisterModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal
