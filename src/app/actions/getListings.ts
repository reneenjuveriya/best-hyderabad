import prisma from '@/app/libs/prismadb';
import { Prisma } from '@prisma/client';

 
export type IListingParams = {
    userId?: string;
    category?: string;
};


export default async function getListings(params: IListingParams) {
    try {
        const { userId, category } = params;

        const query: Prisma.ListingWhereInput = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error) {
        console.error('Error fetching listings:', error);
        throw new Error('Failed to fetch listings.');
    }
}
