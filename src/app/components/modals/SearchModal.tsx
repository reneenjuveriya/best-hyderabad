'use client'
import React from 'react'
import Modal from './Modal'
import useSearchModal from '@/app/hooks/useSearchModal'
// import { useRouter, useSearchParams } from 'next/navigation'

// enum STEPS {
//     LOCATION = 0,
//     DATE=1,
//     INFO=2
// }


const SearchModal = () => {
    const searchModal= useSearchModal();
    // const router=useRouter();
    // const params=useSearchParams();

  return (
    <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={searchModal.onOpen}
        title='Filters'
        actionLabel='Search'
    />
  )
}

export default SearchModal
