import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';

 
const ListingPage = async ({ params } : {params : Promise<{ listingId: string }> }) => {
    const listing = await getListingById(params);
    const currentUser= await getCurrentUser();

    if(!listing){
        return <ClientOnly>
            <EmptyState />
        </ClientOnly>
    }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
      >

      </ListingClient>
    </ClientOnly>

  )
}

export default ListingPage
