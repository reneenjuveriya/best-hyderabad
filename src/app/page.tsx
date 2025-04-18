import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams : IListingParams;
}


const Home = async (
  { searchParams } : HomeProps 
) => {
  
  const listings= await getListings(searchParams);
  const currentUser =await getCurrentUser();

  if(listings?.length === 0){
    return(
      <ClientOnly>
        <EmptyState  showReset/>
      </ClientOnly>
    )
  }
  return (
    <>
      
      {/* <div className="container mx-auto px-24 ">
        <h1>Hello word</h1>
        <p>This is a content to make our page longer</p>
        <div className="w-full h-screen bg-green-300"></div>
        <p>
          Lorem Ipsum is simply dummy text ...
        </p>
      </div> */}
      <ClientOnly>
        <Container>
          <div className="
          pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings?.map((listing ) => {
              return (
                <ListingCard
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                
                />
              )
          })}
          </div>
        </Container>
      </ClientOnly>
    
    </>
  );
}

export default Home
 
