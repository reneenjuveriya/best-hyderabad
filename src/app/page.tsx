import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

type HomeProps = {
  searchParams: Promise<Record<string, string | undefined>>;
}

const Home = async ({ searchParams }: HomeProps) => {
  // Convert searchParams into proper IListingParams
  const { userId, category } = await searchParams;
  const params: IListingParams = {
    userId: userId,
    category: category,
  };

  const listings = await getListings(params);
  const currentUser = await getCurrentUser();

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings?.map((listing) => (
            <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
