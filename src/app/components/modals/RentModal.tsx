'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../input/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../input/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../input/Counter";

enum STEPS {
    CATEGORY= 0,
    LOCATION= 1,
    INFO=2,
    IMAGES=3,
    DESCRIPTION=4,
    PRICE=5
}

const RentModal = () => {
    const rentModal=useRentModal();

    const [step, setStep]= useState(STEPS.CATEGORY);

    const{
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount:1,
            roomCount:1,
            bathromCount:1,
            imageSrc:'',
            price:1,
            title:'',
            description:''

        }
    })

    const category = watch('category');
    const location = watch('location');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr:false
    }),[location])

    const setCustomValue = (id:string, value: any) => {
        setValue(id, value, {
            shouldValidate:true,
            shouldTouch:true,
            shouldDirty:true
        })
    }

    const onBack = () => {
        setStep((value) => value -1);
    }

    const onNext = () => {
        setStep((value) => value +1);
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE){
            return 'Create';
        }

        return 'Next'
    },[step])

    const SecondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY){
            return undefined;
        }

        return 'Back'
    },[step])


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best desribes your place ?"
                subtitle="Pick a category"
            />
            <div 
                className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {categories.map((item) => (
                        <div key={item.label} className="col-span-1">
                           <CategoryInput
                            onClick={(category) => setCustomValue('category',category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                            />
                        </div> 
                    ))}
                </div>
        </div>
    )


    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"    
                />

                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location',value)}

                />

                <Map
                    center={location?.latlng}    
                />

            </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have?"    
                />

                <Counter
                    title="Number of guests"
                    subtitle="How many guests"
                />

            </div>
        )
    }


  return (
    <Modal
        isOpen={rentModal.isOpen}
        body={bodyContent}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryLabel={SecondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Add to Best Hyderabad!"
    />
  )
}

export default RentModal
